import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '~/lib/supabase/server';
import { createPaymentIntent } from '~/lib/stripe';
import { CreatePaymentIntentParams } from '~/types/payment';

export async function POST(request: NextRequest) {
  try {
    const { amount, planId, planName }: CreatePaymentIntentParams = await request.json();
    
    // 验证用户身份
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    // 验证套餐信息
    if (!amount || !planId || !planName) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 创建支付意图
    const paymentIntent = await createPaymentIntent({
      amount,
      currency: 'usd',
      metadata: {
        userId: user.id,
        planId,
        planName,
        type: 'credit_purchase',
      },
    });

    // 保存到数据库
    const { error: dbError } = await supabase
      .from('nano_stripe_payment_intents')
      .insert({
        id: paymentIntent.id,
        user_id: user.id,
        plan_id: parseInt(planId),
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata,
      });

    if (dbError) {
      console.error('保存支付意图到数据库失败:', dbError);
      // 即使数据库保存失败，也返回支付意图，因为Stripe已经创建成功
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('创建支付意图失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
