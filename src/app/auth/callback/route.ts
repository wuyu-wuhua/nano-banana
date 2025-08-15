import { type NextRequest, NextResponse } from "next/server";

import { SYSTEM_CONFIG } from "~/lib/app-config";
import { createSupabaseServerClient } from "~/lib/supabase/server";

// 处理 Supabase Auth 重定向回调
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  // 获取重定向路径
  const redirectPath = requestUrl.searchParams.get("redirect");

  // 如果没有授权码，重定向到登录页面
  if (!code) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  try {
    const supabase = await createSupabaseServerClient();

    // 交换授权码获取会话
    const { error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      throw sessionError;
    }

    // 获取用户信息
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Failed to get user after session exchange");
    }

    // 直接使用 Supabase Auth User，无需在数据库中创建用户记录
    console.log("User authenticated:", user.id);

    // 可以在这里添加其他登录后的逻辑，如发放每日奖励等
    // await checkAndGrantDailyReward(user.id);

    // 如果有重定向路径，则使用它；否则使用系统配置的重定向地址
    const redirectUrl = redirectPath
      ? new URL(redirectPath, request.url)
      : new URL(SYSTEM_CONFIG.redirectAfterSignIn, request.url);

    // 授权成功后重定向到指定地址
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Auth callback error:", error);
    // 授权失败重定向到登录页面
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=callback_error", request.url),
    );
  }
}
