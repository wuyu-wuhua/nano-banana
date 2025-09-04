'use client'

import { useLanguage } from '~/contexts/LanguageContext'
import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import { useAuth } from '~/contexts/auth-context'
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
  const { user } = useAuth();
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
    if (!user) {
      alert(t('pricing.loginRequiredMessage'));
      router.push(`/auth/sign-in?redirectTo=${encodeURIComponent('/pricing')}`);
      return;
    }
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
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24">
          {/* 页面标题 */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6 px-2 sm:px-0">{t('pricing.subtitle')}</p>
            
            {/* 积分说明 */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-50 to-green-50 rounded-full border border-yellow-200">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              <span className="text-xs sm:text-sm font-medium text-yellow-800">
                {t('pricing.creditInfo')}
              </span>
            </div>
          </div>

          {/* 定价卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative shadow-lg border-0 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-yellow-400 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg border-2 border-white">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-semibold">{t('pricing.popular')}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-left sm:text-center pb-4 sm:pb-6 px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-0 mb-3 sm:mb-4 sm:justify-center">
                    <div className="flex items-center gap-0 sm:gap-0 mb-3 sm:mb-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${
                        plan.id === '1' ? 'from-blue-50 to-blue-100' :
                        plan.id === '2' ? 'from-yellow-50 to-green-100' :
                        'from-purple-50 to-purple-100'
                      } rounded-full flex items-center justify-center`}>
                        {plan.id === '1' ? <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" /> :
                         plan.id === '2' ? <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" /> :
                         <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />}
                      </div>
                      <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900 mb-0 ml-2 sm:ml-0">
                        {plan.name}
                      </CardTitle>
                    </div>
                    
                    {/* 移动端价格显示在标题下方，桌面端显示在右侧 */}
                    <div className="sm:hidden mb-4">
                      <div className="flex flex-col items-center justify-center w-full text-center">
                        <div className="flex items-baseline justify-center gap-1 mb-2 w-full">
                          <span className="text-lg font-medium text-gray-500">$</span>
                          <span className="text-3xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
                          <span className="text-xs text-gray-600 font-medium">
                            {t('pricing.oneTime')}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">永久有效</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 桌面端价格显示 */}
                  <div className="hidden sm:block mb-4 sm:mb-6">
                    <div className="flex flex-col items-center justify-center w-full text-center">
                      <div className="flex items-baseline justify-center gap-1 mb-2 w-full">
                        <span className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-500">$</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                          {t('pricing.oneTime')}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">永久有效</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 积分和生成次数 */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="text-left sm:text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{plan.credits}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{t('pricing.credits')}</div>
                    </div>
                    <div className="text-left sm:text-center p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{Math.floor(plan.credits / 10)}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{t('pricing.generations')}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6">
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.id === '1' && (t('pricing.features.basic') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 text-left">{feature}</span>
                      </li>
                    ))}
                    {plan.id === '2' && (t('pricing.features.advanced') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 text-left">{feature}</span>
                      </li>
                    ))}
                    {plan.id === '3' && (t('pricing.features.professional') as unknown as string[]).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-700 text-gray-700 text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleBuyNow(plan)}
                    className={`w-full py-3 sm:py-4 text-sm sm:text-lg font-semibold bg-gradient-to-r ${
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
              <CardContent className="p-4 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {t('pricing.whyChoose')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <Gift className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{t('pricing.benefits.flexible.title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('pricing.benefits.flexible.desc')}</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{t('pricing.benefits.transparent.title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('pricing.benefits.transparent.desc')}</p>
                  </div>
                  <div className="text-center sm:col-span-2 lg:col-span-1">
                    <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{t('pricing.benefits.value.title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('pricing.benefits.value.desc')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 行动按钮 */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{t('pricing.contact')}</p>
            <div className="flex flex-row sm:flex-col gap-3 sm:gap-4 justify-center">
              <Link href="/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t('pricing.startCreating')}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('pricing.contactSupport')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 悬浮球 - 移动端优化 */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <div className="flex flex-col gap-2 sm:gap-3">
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:scale-110 border border-gray-200">
            <Star className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-700 hover:scale-110 border border-gray-200">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
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
