import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '~/lib/supabase/server';
import { confirmPayment } from '~/lib/stripe';
import { ConfirmPaymentParams } from '~/types/payment';

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId }: ConfirmPaymentParams = await request.json();
    
    // 验证用户身份
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 验证支付意图ID
    if (!paymentIntentId) {
      return NextResponse.json({ error: '缺少支付意图ID' }, { status: 400 });
    }

    // 确认支付状态
    const paymentIntent = await confirmPayment(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: '支付未完成' }, { status: 400 });
    }

    // 获取支付意图的元数据
    const { planId, planName } = paymentIntent.metadata;
    
    // 根据套餐ID确定积分数量
    let credits = 0;
    switch (planId) {
      case '1': // 基础套餐
        credits = 500;
        break;
      case '2': // 进阶套餐
        credits = 1000;
        break;
      case '3': // 专业套餐
        credits = 3000;
        break;
      default:
        // 如果没有匹配的套餐ID，根据金额计算积分（每$1 = 60积分）
        credits = Math.floor((paymentIntent.amount / 100) * 60);
    }

    // 添加积分到用户账户
    const { data: creditResult, error: creditError } = await supabase.rpc(
      'nano_add_user_credits',
      {
        p_user_id: user.id,
        p_amount: credits,
        p_type: 'PURCHASE',
        p_description: `充值积分: ${planName}`,
        p_reference_id: paymentIntentId,
        p_metadata: { paymentIntentId, planId, planName },
      },
    );

    if (creditError) {
      console.error('添加积分失败:', creditError);
      // 即使添加积分失败，也返回成功，因为支付已经完成
      // 可以通过其他方式（如管理员手动添加）来解决
    }

    // 记录支付历史
    const { error: historyError } = await supabase
      .from('nano_payment_history')
      .insert({
        user_id: user.id,
        plan_id: parseInt(planId),
        stripe_payment_intent_id: paymentIntentId,
        amount: paymentIntent.amount,
        credits,
        status: 'completed',
      });

    if (historyError) {
      console.error('记录支付历史失败:', historyError);
    }

    return NextResponse.json({
      success: true,
      credits,
      transactionId: creditResult?.transaction_id || null,
    });
  } catch (error) {
    console.error('确认支付失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
