'use client'

import { useLanguage } from '~/contexts/LanguageContext'
import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { CheckoutForm } from '~/components/payment/CheckoutForm'
import { CreditPlan } from '~/types/payment'
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

// 加载Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const plans: CreditPlan[] = [
    {
      id: '1',
      name: t('pricing.basic'),
      price: 6.90,
      credits: 500,
      description: '500积分，适合个人用户',
      popular: false
    },
    {
      id: '2',
      name: t('pricing.advanced'),
      price: 9.90,
      credits: 1000,
      description: '1000积分，最受欢迎的选择',
      popular: true
    },
    {
      id: '3',
      name: t('pricing.professional'),
      price: 19.90,
      credits: 3000,
      description: '3000积分，适合专业用户',
      popular: false
    }
  ];

  const handleBuyNow = (plan: CreditPlan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (credits: number) => {
    setShowCheckout(false);
    setSelectedPlan(null);
    
    // 显示成功消息
    alert(`支付成功！已获得 ${credits} 积分`);
    
    // 跳转到个人资料页面
    router.push('/profile');
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
  };

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
                key={plan.id} 
                className={`relative shadow-lg border-0 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-yellow-400 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full shadow-lg border-2 border-white">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">{t('pricing.popular')}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 ${
                    plan.id === '1' ? 'from-blue-50 to-blue-100' :
                    plan.id === '2' ? 'from-yellow-50 to-green-100' :
                    'from-purple-50 to-purple-100'
                  } rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {plan.id === '1' ? <Zap className="w-8 h-8 text-blue-600" /> :
                     plan.id === '2' ? <Star className="w-8 h-8 text-yellow-600" /> :
                     <Crown className="w-8 h-8 text-purple-600" />}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-lg text-gray-500 font-medium">
                        {t('pricing.oneTime')}
                      </span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-gray-400 font-medium">
                        一次性购买，永久有效
                      </span>
                    </div>
                  </div>
                  
                  {/* 积分和生成次数 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{plan.credits}</div>
                      <div className="text-sm text-gray-600 font-medium">{t('pricing.credits')}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{Math.floor(plan.credits / 10)}</div>
                      <div className="text-sm text-gray-600 font-medium">{t('pricing.generations')}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.id === '1' && (t('pricing.features.basic') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.id === '2' && (t('pricing.features.advanced') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.id === '3' && (t('pricing.features.professional') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleBuyNow(plan)}
                    className={`w-full py-4 text-lg font-semibold bg-gradient-to-r ${
                      plan.id === '1' ? 'from-blue-500 to-blue-600' :
                      plan.id === '2' ? 'from-yellow-500 to-green-500' :
                      'from-purple-500 to-purple-600'
                    } hover:opacity-90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
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
      
      {/* 支付表单 */}
      {showCheckout && selectedPlan && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            plan={selectedPlan}
            onSuccess={handlePaymentSuccess}
            onClose={handleCloseCheckout}
          />
        </Elements>
      )}
      
      <Footer />
    </div>
  )
}
