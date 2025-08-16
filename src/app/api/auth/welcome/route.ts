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
    
    console.log(`Welcome API called for user: ${userId} (${userEmail})`);
    
    // 首先尝试使用Google OAuth专用函数赠送积分
    const { data: googleGiftResult, error: googleGiftError } = await supabase.rpc('nano_gift_google_oauth_user', {
      p_user_id: userId
    });

    if (googleGiftError) {
      console.error('Error with Google OAuth gift function:', googleGiftError);
      // 如果Google OAuth函数失败，回退到原始函数
      const { data: giftResult, error: giftError } = await supabase.rpc('nano_gift_new_user_credits', {
        p_user_id: userId
      });

      if (giftError) {
        console.error('Error gifting credits to new user:', giftError);
        return NextResponse.json({ error: 'Failed to gift credits' }, { status: 500 });
      }

      // 记录详细的结果
      if (giftResult) {
        console.log(`✅ Successfully gifted 50 credits to new user: ${userId} (${userEmail})`);
      } else {
        console.log(`ℹ️ User ${userId} (${userEmail}) is not eligible for welcome credits (may be existing user)`);
      }

      return NextResponse.json({ 
        success: true, 
        gifted: giftResult,
        message: giftResult ? 'Welcome! You have been gifted 50 credits.' : 'Welcome back!',
        userId: userId,
        userEmail: userEmail,
        method: 'fallback'
      });
    }

    // 记录Google OAuth函数的结果
    if (googleGiftResult) {
      console.log(`✅ Successfully gifted 50 credits to Google OAuth user: ${userId} (${userEmail})`);
    } else {
      console.log(`ℹ️ Google OAuth user ${userId} (${userEmail}) is not eligible for welcome credits`);
    }

    return NextResponse.json({ 
      success: true, 
      gifted: googleGiftResult,
      message: googleGiftResult ? 'Welcome! You have been gifted 50 credits.' : 'Welcome back!',
      userId: userId,
      userEmail: userEmail,
      method: 'google_oauth'
    });

  } catch (error) {
    console.error('Error in welcome endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
