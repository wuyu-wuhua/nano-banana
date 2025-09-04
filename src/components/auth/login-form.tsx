"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SYSTEM_CONFIG } from "../../lib/app-config";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { GitHubIcon } from "../ui/icons/github";
import { GoogleIcon } from "../ui/icons/google";
import { supabase } from "../../lib/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { useLanguage } from "../../contexts/LanguageContext";

export function LoginForm({
  className,
  redirectTo,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  redirectTo?: null | string;
}) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = redirectTo || searchParams.get("redirect");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push(redirectPath || SYSTEM_CONFIG.redirectAfterSignIn);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t('auth.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (e: React.FormEvent, provider: Provider) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
      if (redirectPath) {
        callbackUrl.searchParams.set("redirect", redirectPath);
      }

      await supabase.auth.signInWithOAuth({
        options: {
          redirectTo: callbackUrl.toString(),
        },
        provider,
      });
    } catch (err) {
      setError(t('auth.oauth.error'));
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("z-20 flex flex-col gap-6 w-full max-w-2xl", className)} {...props}>
      <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-green-50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* 标题区域 */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-2">
              {t('auth.login.title')}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">{t('auth.login.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            {/* 邮箱输入 */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">{t('auth.login.email')}</Label>
              <div className="relative">
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">{t('auth.login.password')}</Label>
                <Link
                  className="text-xs sm:text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                  href="/auth/forgot-password"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* 登录按钮 */}
            <Button 
              className="w-full h-10 sm:h-12 text-sm sm:text-lg font-semibold bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200" 
              disabled={isLoading} 
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  {t('auth.login.loggingIn')}
                </div>
              ) : (
                t('auth.login.loginButton')
              )}
            </Button>

            {/* 分隔线 */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">
                  {t('auth.login.orContinueWith')}
                </span>
              </div>
            </div>

            {/* 社交登录按钮 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                className="h-10 sm:h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-sm sm:text-base"
                disabled={isLoading}
                onClick={(e) => handleOAuthLogin(e, "github")}
                variant="outline"
              >
                <GitHubIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                GitHub
              </Button>
              <Button
                className="h-10 sm:h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-sm sm:text-base"
                disabled={isLoading}
                onClick={(e) => handleOAuthLogin(e, "google")}
                variant="outline"
              >
                <GoogleIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Google
              </Button>
            </div>

            {/* 注册链接 */}
            <div className="text-center pt-3 sm:pt-4">
              <p className="text-gray-600 text-sm sm:text-base">
                {t('auth.login.noAccount')}{" "}
                <Link
                  className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200"
                  href="/auth/sign-up"
                >
                  {t('auth.login.signUp')}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
