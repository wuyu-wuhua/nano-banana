'use client'

import { useAuth } from '~/contexts/auth-context'
import { useLanguage } from '~/contexts/LanguageContext'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { 
  User, 
  Crown, 
  Gift, 
  Settings, 
  Edit, 
  Shield,
  Star,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h1>
          <Link href="/auth/sign-in">
            <Button>去登录</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="relative flex-1 bg-white">
        {/* 点状背景 - 使用更明显的样式 */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 2px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent mb-2">
              个人资料
            </h1>
            <p className="text-gray-600">管理您的账户信息和设置</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* 主要信息卡片 */}
            <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 text-white text-3xl font-bold flex items-center justify-center shadow-lg">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {user.email || '用户'}
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Shield className="w-3 h-3 mr-1" />
                    已验证用户
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">用户名</p>
                        <p className="font-medium text-gray-900">{user.email?.split('@')[0] || 'user'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Crown className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">用户ID</p>
                        <p className="font-medium text-gray-900 font-mono text-sm">
                          {user.id || 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-500">用户积分</p>
                        <p className="font-medium text-gray-900">1,250 分</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Gift className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">免费次数</p>
                        <p className="font-medium text-gray-900">5 次</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 统计信息卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">AI生成次数</h3>
                  <p className="text-3xl font-bold text-blue-600">28</p>
                  <p className="text-sm text-gray-600">本月已使用</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">收藏作品</h3>
                  <p className="text-3xl font-bold text-green-600">12</p>
                  <p className="text-sm text-gray-600">已收藏作品</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">会员等级</h3>
                  <p className="text-3xl font-bold text-purple-600">VIP</p>
                  <p className="text-sm text-gray-600">高级用户</p>
                </CardContent>
              </Card>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  开始AI创作
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="px-8">
                  <Star className="w-5 h-5 mr-2" />
                  查看作品集
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8">
                <Settings className="w-5 h-5 mr-2" />
                账户设置
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
