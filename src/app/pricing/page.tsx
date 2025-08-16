'use client'

import { useLanguage } from '~/contexts/LanguageContext'
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
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t('pricing.basic'),
      price: "$6.9",
      credits: 500,
      generations: 50,
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      features: t('pricing.features.basic') as unknown as string[],
      popular: false
    },
    {
      name: t('pricing.advanced'),
      price: "$9.9",
      credits: 1000,
      generations: 100,
      icon: Star,
      color: "from-yellow-500 to-green-500",
      bgColor: "from-yellow-50 to-green-100",
      features: t('pricing.features.advanced') as unknown as string[],
      popular: true
    },
    {
      name: t('pricing.professional'),
      price: "$19.9",
      credits: 3000,
      generations: 300,
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      features: t('pricing.features.professional') as unknown as string[],
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
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{t('pricing.subtitle')}</p>
            
            {/* 积分说明 */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-50 to-green-50 rounded-full border border-yellow-200">
              <Target className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                {t('pricing.creditInfo')}
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
                    {t('pricing.popular')}
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
                    <span className="text-gray-500 ml-2">{t('pricing.oneTime')}</span>
                  </div>
                  
                  {/* 积分和生成次数 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{plan.credits}</div>
                      <div className="text-sm text-gray-600">{t('pricing.credits')}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{plan.generations}</div>
                      <div className="text-sm text-gray-600">{t('pricing.generations')}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 text-lg font-semibold bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0`}
                  >
                    {t('pricing.buyNow')}
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
                  {t('pricing.whyChoose')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Gift className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.benefits.flexible.title')}</h4>
                    <p className="text-gray-600">{t('pricing.benefits.flexible.desc')}</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.benefits.transparent.title')}</h4>
                    <p className="text-gray-600">{t('pricing.benefits.transparent.desc')}</p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-2">{t('pricing.benefits.value.title')}</h4>
                    <p className="text-gray-600">{t('pricing.benefits.value.desc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 行动按钮 */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">{t('pricing.contact')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  {t('pricing.startCreating')}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                {t('pricing.contactSupport')}
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
