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
    const userEmail = session.user.email;
    
    console.log(`Manual gift API called for user: ${userId} (${userEmail})`);
    
    // 检查用户是否已经有积分记录
    const { data: existingCredits, error: creditsError } = await supabase
      .from('nano_user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();
    
    if (creditsError && creditsError.code !== 'PGRST116') {
      console.error('Error checking existing credits:', creditsError);
      return NextResponse.json({ error: 'Failed to check existing credits' }, { status: 500 });
    }
    
    // 检查用户是否已经有交易记录
    const { data: existingTransactions, error: transactionsError } = await supabase
      .from('nano_credit_transactions')
      .select('id')
      .eq('user_id', userId)
      .limit(1);
    
    if (transactionsError) {
      console.error('Error checking existing transactions:', transactionsError);
      return NextResponse.json({ error: 'Failed to check existing transactions' }, { status: 500 });
    }
    
    // 如果用户已经有积分或交易记录，不允许手动赠送
    if (existingCredits || existingTransactions.length > 0) {
      return NextResponse.json({ 
        error: 'User already has credits or transaction history',
        existingCredits: existingCredits?.credits || 0,
        hasTransactions: existingTransactions.length > 0
      }, { status: 400 });
    }
    
    // 手动插入积分记录
    const { data: creditsData, error: insertCreditsError } = await supabase
      .from('nano_user_credits')
      .insert({
        user_id: userId,
        credits: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (insertCreditsError) {
      console.error('Error inserting credits:', insertCreditsError);
      return NextResponse.json({ error: 'Failed to insert credits' }, { status: 500 });
    }
    
    // 插入交易记录
    const { data: transactionData, error: insertTransactionError } = await supabase
      .from('nano_credit_transactions')
      .insert({
        user_id: userId,
        amount: 50,
        type: 'GIFT',
        description: '手动赠送积分（调试用）',
        metadata: {
          source: 'manual_gift',
          amount: 50,
          user_email: userEmail,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();
    
    if (insertTransactionError) {
      console.error('Error inserting transaction:', insertTransactionError);
      return NextResponse.json({ error: 'Failed to insert transaction' }, { status: 500 });
    }
    
    console.log(`✅ Successfully manually gifted 50 credits to user: ${userId} (${userEmail})`);
    
    return NextResponse.json({ 
      success: true, 
      gifted: true,
      message: 'Successfully gifted 50 credits!',
      userId: userId,
      userEmail: userEmail,
      method: 'manual_gift',
      creditsData,
      transactionData
    });

  } catch (error) {
    console.error('Error in manual gift endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
