'use client'

import { useLanguage } from '~/contexts/LanguageContext'
import { useAuth } from '~/contexts/auth-context'
import { useEffect, useState } from 'react'
import { supabase } from '~/lib/supabase/client'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { DotPattern } from '~/components/magicui/dot-pattern'
import { 
  User, 
  Mail, 
  Calendar, 
  Zap, 
  Star, 
  Crown,
  Settings,
  LogOut,
  Plus,
  Image as ImageIcon,
  Heart,
  Trophy,
  Edit,
  Shield,
  Award,
  Clock
} from 'lucide-react'
import Link from 'next/link'

interface UserCredits {
  credits: number;
  last_updated: string;
}

interface CreditTransaction {
  id: number;
  type: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function ProfilePage() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取用户积分和交易记录
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        console.log('开始获取用户数据，用户ID:', user.id);
        
        // 获取用户积分
        const { data: creditsData, error: creditsError } = await supabase.rpc(
          'nano_get_user_credits',
          { p_user_id: user.id }
        );
        
        console.log('积分查询结果:', { creditsData, creditsError });
        
        if (!creditsError && creditsData && creditsData.length > 0) {
          setUserCredits(creditsData[0]);
          console.log('设置用户积分:', creditsData[0]);
        } else {
          console.log('没有找到积分数据，尝试从用户积分表直接查询');
          
          // 如果函数调用失败，尝试直接从表查询
          const { data: directCreditsData, error: directCreditsError } = await supabase
            .from('nano_user_credits')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          console.log('直接查询结果:', { directCreditsData, directCreditsError });
          
          if (!directCreditsError && directCreditsData) {
            setUserCredits(directCreditsData);
            console.log('设置直接查询的积分:', directCreditsData);
          }
        }

        // 获取最近的交易记录
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('nano_credit_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        console.log('交易记录查询结果:', { transactionsData, transactionsError });

        if (!transactionsError && transactionsData) {
          setRecentTransactions(transactionsData);
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // 模拟数据（如果数据库还没有数据）
  const mockCredits = userCredits?.credits || 0;
  const mockGenerations = Math.floor(mockCredits / 10); // 每10积分生成1次
  const mockCollections = 12; // 收藏作品数量
  const mockMembership = 'VIP'; // 会员等级

  // 计算累计统计
  const calculateStats = () => {
    if (!recentTransactions.length) {
      return {
        totalEarned: mockCredits,
        totalSpent: 0,
        remainingGenerations: Math.floor(mockCredits / 10)
      };
    }

    // 只计算真实的充值记录，不包括当前余额
    const totalEarned = recentTransactions
      .filter(tx => (tx.type === 'PURCHASE' || tx.type === 'GIFT') && tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalSpent = recentTransactions
      .filter(tx => tx.type === 'CONSUME' && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const remainingGenerations = Math.floor(mockCredits / 10);

    console.log('积分统计计算:', {
      transactions: recentTransactions,
      totalEarned,
      totalSpent,
      currentCredits: mockCredits,
      remainingGenerations
    });

    return {
      totalEarned,
      totalSpent,
      remainingGenerations
    };
  };

  const stats = calculateStats();

  // 翻译套餐描述
  const translatePackageDescription = (description: string) => {
    if (!description) return t('profile.packagePurchase');
    
    // 处理新用户赠送积分
    if (description.includes('新用户赠送积分')) {
      return t('profile.newUserGift');
    }
    
    // 替换中文套餐名称
    let translatedDesc = description
      .replace('基础套餐', t('profile.basicPackage'))
      .replace('进阶套餐', t('profile.advancedPackage'))
      .replace('专业套餐', t('profile.professionalPackage'))
      .replace('充值积分', t('profile.rechargePoints'));
    
    return translatedDesc;
  };

  // 生成用户名（从邮箱提取）
  const getUsername = (email: string | undefined) => {
    if (!email) return 'User';
    
    // 提取邮箱前缀
    const prefix = email.split('@')[0];
    
    // 如果前缀包含数字，尝试提取更友好的用户名
    if (/\d/.test(prefix)) {
      // 移除数字，保留字母部分
      const letters = prefix.replace(/\d/g, '');
      if (letters.length > 0) {
        // 首字母大写
        return letters.charAt(0).toUpperCase() + letters.slice(1);
      }
    }
    
    // 如果前缀是纯字母，首字母大写
    if (/^[a-zA-Z]+$/.test(prefix)) {
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    
    // 默认情况，首字母大写
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  };

  // 获取用户头像首字母
  const getAvatarInitial = (email: string | undefined) => {
    if (!email) return 'U';
    
    // 使用改进后的用户名的首字母
    const username = getUsername(email);
    return username.charAt(0).toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('profile.loginRequired')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('profile.loginToView')}
            </p>
            <Link href="/auth/sign-in">
              <Button className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white">
                {t('profile.goToLogin')}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* 自定义滚动条样式 */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      
      <div className="flex-1 bg-gray-50 relative">
        {/* 背景点状图案 */}
        <DotPattern width={50} height={50} cr={2} className="opacity-40 text-gray-400" />
        
        <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent mb-4">
              {t('profile.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('profile.subtitle')}</p>
          </div>

          {/* 用户信息卡片 - 重新设计 */}
          <Card className="max-w-6xl mx-auto mb-8 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* 左侧：头像和基本信息 */}
                <div className="text-center lg:text-left">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl mb-4 mx-auto lg:mx-0">
                      <span className="text-3xl font-bold text-white">
                        {getAvatarInitial(user.email)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {getUsername(user.email)}
                    </h2>
                    <p className="text-sm text-gray-500">{t('profile.welcomeBack')}</p>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                </div>

                {/* 右侧：三个统计卡片 */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-100 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{mockCredits}</div>
                    <p className="text-sm text-gray-600">{t('profile.currentCredits')}</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalEarned}</div>
                    <p className="text-sm text-gray-600">{t('profile.totalEarned')}</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalSpent}</div>
                    <p className="text-sm text-gray-600">{t('profile.totalSpent')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 积分概览和交易记录 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
            {/* 积分概览 */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-green-50 border-b border-yellow-200">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800">{t('profile.creditsOverview')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg p-4 border border-yellow-300">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-700 mb-2">
                      {mockCredits}
                    </div>
                    <p className="text-lg text-yellow-800 font-medium">
                      {t('profile.availableCredits')}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      {t('profile.creditsDescription')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.remainingGenerations}
                    </div>
                    <p className="text-sm text-blue-600">
                      {t('profile.remainingGenerations')}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {mockCredits}
                    </div>
                    <p className="text-sm text-green-600">
                      {t('profile.availableCredits')}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/pricing">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white shadow-lg py-4 text-lg">
                      <Plus className="w-5 h-5 mr-2" />
                      {t('profile.buyMoreCredits')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 交易记录 */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-blue-800">{t('profile.transactionHistory')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {recentTransactions.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {recentTransactions.map((transaction, index) => {
                      const isConsumption = transaction.type === 'CONSUME' && transaction.amount < 0;
                      const isRecharge = transaction.type === 'PURCHASE' && transaction.amount > 0;
                      
                      return (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isConsumption ? 'bg-red-100' : 'bg-green-100'
                            }`}>
                              {isConsumption ? (
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {isConsumption ? t('profile.consumption') : 
                                  transaction.type === 'GIFT' ? t('profile.gift') :
                                  t('profile.recharge')
                                }
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(transaction.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${
                              isConsumption ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {isConsumption ? '-' : '+'}{Math.abs(transaction.amount)} {t('profile.credits')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {isConsumption ? t('profile.generationResult') : 
                                transaction.type === 'GIFT' ? t('profile.newUserGift') :
                                `${t('profile.creditRecharge')}: ${translatePackageDescription(transaction.description)}`
                              }
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>{t('profile.noTransactionRecords')}</p>
                    <Link href="/pricing">
                      <Button variant="outline" className="mt-3">
                        {t('profile.purchaseCredits')}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 快速操作 */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-10 py-6 shadow-lg text-lg font-semibold">
                  <Zap className="w-6 h-6 mr-3" />
                  {t('profile.startGenerating')}
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="px-10 py-6 shadow-lg text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400">
                  <ImageIcon className="w-6 h-6 mr-3" />
                  {t('profile.viewGallery')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
