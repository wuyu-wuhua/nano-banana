'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { WarpBackground } from '~/components/ui/warp-background'
import { supabase } from '~/lib/supabase/client'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // 检查是否有访问令牌
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/sign-in?error=no_session')
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('密码不匹配')
      return
    }

    if (password.length < 6) {
      setError('密码长度至少为6位')
      return
    }

    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setMessage('密码更新成功！正在重定向到登录页面...')
      setTimeout(() => {
        router.push('/auth/sign-in')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新密码时发生错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-2">
                    更新密码
                  </h1>
                  <p className="text-gray-600 text-lg">请输入您的新密码</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 新密码输入 */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">新密码</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-12 px-4 text-base border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 transition-all duration-200 rounded-xl"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* 确认新密码输入 */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">确认新密码</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
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
                  
                  {/* 更新按钮 */}
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        更新中...
                      </div>
                    ) : (
                      '更新密码'
                    )}
                  </Button>
                  
                  {/* 返回登录链接 */}
                  <div className="text-center pt-4">
                    <Link 
                      href="/auth/sign-in" 
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition-colors duration-200"
                    >
                      返回登录
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
