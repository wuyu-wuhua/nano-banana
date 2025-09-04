import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '~/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // 获取当前用户会话
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { amount, description, metadata } = await request.json();
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    
    console.log(`Consuming ${amount} credits for user: ${userId} (${session.user.email})`);
    
    // 调用数据库函数消耗积分
    const { data: consumeResult, error: consumeError } = await supabase.rpc('nano_consume_user_credits', {
      p_user_id: userId,
      p_amount: amount,
      p_description: description || 'AI图片生成',
      p_metadata: metadata || {}
    });

    if (consumeError) {
      console.error('Error consuming credits:', consumeError);
      return NextResponse.json({ error: 'Failed to consume credits' }, { status: 500 });
    }

    // 检查消耗结果
    if (!consumeResult || consumeResult.length === 0) {
      return NextResponse.json({ error: 'Failed to consume credits' }, { status: 500 });
    }

    const { success, remaining_credits, transaction_id } = consumeResult[0];
    
    if (!success) {
      return NextResponse.json({ 
        error: 'insufficient_credits',
        message: '积分不足',
        remaining_credits: remaining_credits || 0
      }, { status: 400 });
    }

    console.log(`✅ Successfully consumed ${amount} credits for user: ${userId}. Remaining: ${remaining_credits}`);

    return NextResponse.json({ 
      success: true,
      consumed: amount,
      remaining_credits,
      transaction_id,
      message: `成功消耗${amount}积分，剩余${remaining_credits}积分`
    });

  } catch (error) {
    console.error('Error in consume credits endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
