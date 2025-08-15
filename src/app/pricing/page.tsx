'use client'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { 
  Zap, 
  Star, 
  Crown, 
  Check,
  Sparkles,
  Gift,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: "基础套餐",
      price: "$6.9",
      credits: 500,
      generations: 50,
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      features: [
        "500 积分",
        "50 次AI生成",
        "基础图片质量",
        "标准客服支持",
        "7天退款保证"
      ],
      popular: false
    },
    {
      name: "进阶套餐",
      price: "$9.9",
      credits: 1000,
      generations: 100,
      icon: Star,
      color: "from-yellow-500 to-green-500",
      bgColor: "from-yellow-50 to-green-100",
      features: [
        "1000 积分",
        "100 次AI生成",
        "高清图片质量",
        "优先客服支持",
        "30天退款保证",
        "专属生成模板"
      ],
      popular: true
    },
    {
      name: "专业套餐",
      price: "$19.9",
      credits: 3000,
      generations: 300,
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      features: [
        "3000 积分",
        "300 次AI生成",
        "超高清图片质量",
        "24/7 专属客服",
        "90天退款保证",
        "专属生成模板",
        "批量生成功能",
        "API 访问权限"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent mb-4">
              选择您的套餐
            </h1>
            <p className="text-xl text-gray-600 mb-6">基于积分的灵活定价，每次生成仅需10积分</p>
            
            {/* 积分说明 */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-50 to-green-50 rounded-full border border-yellow-200">
              <Target className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                每次AI生成消耗 10 积分
              </span>
            </div>
          </div>

          {/* 定价卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative shadow-lg border-0 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-yellow-400 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-green-500 text-white border-0 px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    最受欢迎
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className={`w-8 h-8 text-white`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">/ 一次性</span>
                  </div>
                  
                  {/* 积分和生成次数 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{plan.credits}</div>
                      <div className="text-sm text-gray-600">积分</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{plan.generations}</div>
                      <div className="text-sm text-gray-600">次生成</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 text-lg font-semibold bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0`}
                  >
                    立即购买
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 额外信息 */}
          <div className="text-center max-w-4xl mx-auto">
            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  为什么选择我们的积分系统？
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Gift className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">灵活使用</h4>
                    <p className="text-gray-600">积分永久有效，随时使用，不设时间限制</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">透明定价</h4>
                    <p className="text-gray-600">每次生成固定10积分，价格清晰明了</p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">高性价比</h4>
                    <p className="text-gray-600">相比按次付费，积分套餐更经济实惠</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 行动按钮 */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">还有疑问？联系我们获取更多信息</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  开始AI创作
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                联系客服
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 悬浮球 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <button className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110">
            <Zap className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:scale-110 border border-gray-200">
            <Star className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:scale-110 border border-gray-200">
            <Crown className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
