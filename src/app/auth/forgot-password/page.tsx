'use client'

import Link from 'next/link'
import { useState } from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { WarpBackground } from '~/components/ui/warp-background'
import { supabase } from '~/lib/supabase/client'
import { useLanguage } from '~/contexts/LanguageContext'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error

      setMessage(t('auth.forgotPassword.successMessage'))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.forgotPassword.errorMessage'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 pt-32">
        <WarpBackground 
          className="w-full max-w-md border-0 bg-transparent p-0"
          perspective={800}
          beamsPerSide={5}
          beamSize={8}
          beamDelayMax={4}
          beamDelayMin={0}
          beamDuration={4}
          gridColor="rgba(255, 255, 255, 0.1)"
        >
          <div className="w-full">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-2">
                    {t('auth.forgotPassword.title')}
                  </h1>
                  <p className="text-gray-600 text-lg">{t('auth.forgotPassword.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 邮箱输入 */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">{t('auth.forgotPassword.email')}</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 px-4 text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-xl"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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

                  {/* 成功提示 */}
                  {message && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-green-600">{message}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* 发送按钮 */}
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        {t('auth.forgotPassword.sending')}
                      </div>
                    ) : (
                      t('auth.forgotPassword.sendButton')
                    )}
                  </Button>
                  
                  {/* 返回登录链接 */}
                  <div className="text-center pt-4">
                    <Link 
                      href="/auth/sign-in" 
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200"
                    >
                      {t('auth.forgotPassword.backToLogin')}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </WarpBackground>
      </main>
      
      <Footer />
    </div>
  )
}
