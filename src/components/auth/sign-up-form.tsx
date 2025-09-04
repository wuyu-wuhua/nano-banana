"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeading,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

import { GitHubIcon } from "~/components/ui/icons/github";
import { GoogleIcon } from "~/components/ui/icons/google";
import { supabase } from "~/lib/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { useLanguage } from "~/contexts/LanguageContext";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError(t('auth.signup.passwordMismatch'));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
        password,
      });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t('auth.signup.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (e: React.FormEvent, provider: Provider) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await supabase.auth.signInWithOAuth({
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-green-50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative p-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-2">
              {t('auth.signup.title')}
            </h1>
            <p className="text-gray-600 text-lg">{t('auth.signup.subtitle')}</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* 邮箱输入 */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">{t('auth.signup.email')}</Label>
              <div className="relative">
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  className="h-12 px-4 text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-xl"
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
              <Label htmlFor="password" className="text-gray-700 font-medium">{t('auth.signup.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  value={password}
                  className="h-12 px-4 text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 确认密码输入 */}
            <div className="space-y-2">
              <Label htmlFor="repeat-password" className="text-gray-700 font-medium">{t('auth.signup.confirmPassword')}</Label>
              <div className="relative">
                <Input
                  id="repeat-password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  type="password"
                  value={repeatPassword}
                  className="h-12 px-4 text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

            {/* 注册按钮 */}
            <Button 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200" 
              disabled={isLoading} 
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  {t('auth.signup.creating')}
                </div>
              ) : (
                t('auth.signup.createAccount')
              )}
            </Button>

            {/* 分隔线 */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  {t('auth.signup.orContinueWith')}
                </span>
              </div>
            </div>

            {/* 社交登录按钮 */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={isLoading}
                onClick={(e) => handleOAuthLogin(e, "github")}
                variant="outline"
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button
                className="h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={isLoading}
                onClick={(e) => handleOAuthLogin(e, "google")}
                variant="outline"
              >
                <GoogleIcon className="mr-2 h-5 w-5" />
                Google
              </Button>
            </div>

            {/* 登录链接 */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                {t('auth.signup.hasAccount')}{" "}
                <Link
                  className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200"
                  href="/auth/sign-in"
                >
                  {t('auth.signup.signIn')}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
