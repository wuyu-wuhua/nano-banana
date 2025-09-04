"use client"

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/auth-context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Shield, Cookie, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';

export default function CookieSettingsPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<{
    isSilentMode: boolean;
    consentChoice: string | null;
  }>({ isSilentMode: false, consentChoice: null });

  useEffect(() => {
    // 获取当前Cookie状态
    updateCurrentStatus();
    
    // 根据当前状态设置开关
    const consentChoice = localStorage.getItem('nano_cookie_consent');
    const silentMode = localStorage.getItem('nano_silent_mode');
    
    if (consentChoice === 'accepted') {
      setAnalyticsCookies(true);
      setMarketingCookies(true);
    } else if (consentChoice === 'rejected') {
      setAnalyticsCookies(false);
      setMarketingCookies(false);
    }
  }, []);

  const updateCurrentStatus = () => {
    const consentChoice = localStorage.getItem('nano_cookie_consent');
    const silentMode = localStorage.getItem('nano_silent_mode');
    
    setCurrentStatus({
      isSilentMode: silentMode === 'true',
      consentChoice: consentChoice
    });
  };

  const handleSaveSettings = () => {
    if (analyticsCookies || marketingCookies) {
      // 用户同意某些Cookie
      localStorage.setItem('nano_cookie_consent', 'accepted');
      localStorage.setItem('nano_silent_mode', 'false');
      
      // 重新加载页面以应用新的Cookie设置
      window.location.reload();
    } else {
      // 用户拒绝所有非必要Cookie
      localStorage.setItem('nano_cookie_consent', 'rejected');
      localStorage.setItem('nano_silent_mode', 'true');
      
      // 重新加载页面以应用新的Cookie设置
      window.location.reload();
    }
  };

  const handleResetSettings = () => {
    // 重置为拒绝所有
    localStorage.setItem('nano_cookie_consent', 'rejected');
    localStorage.setItem('nano_silent_mode', 'true');
    
    // 重新加载页面
    window.location.reload();
  };

  const getStatusText = () => {
    if (currentStatus.isSilentMode) {
      return language === 'zh' ? '静默模式已启用' : 'Silent mode enabled';
    }
    if (currentStatus.consentChoice === 'accepted') {
      return language === 'zh' ? '已接受所有Cookie' : 'All cookies accepted';
    }
    if (currentStatus.consentChoice === 'rejected') {
      return language === 'zh' ? '已拒绝非必要Cookie' : 'Non-essential cookies rejected';
    }
    return language === 'zh' ? '未设置' : 'Not set';
  };

  const getStatusColor = () => {
    if (currentStatus.isSilentMode) {
      return 'text-green-600 bg-green-100';
    }
    if (currentStatus.consentChoice === 'accepted') {
      return 'text-blue-600 bg-blue-100';
    }
    if (currentStatus.consentChoice === 'rejected') {
      return 'text-red-600 bg-red-100';
    }
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'zh' ? 'Cookie 设置' : 'Cookie Settings'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'zh' 
                ? '管理您的Cookie偏好设置，控制网站如何收集和使用您的信息'
                : 'Manage your cookie preferences and control how this website collects and uses your information'
              }
            </p>
          </div>

          {/* 当前状态 */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {language === 'zh' ? '当前状态' : 'Current Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </div>
            </CardContent>
          </Card>

          {/* Cookie设置 */}
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                {language === 'zh' ? 'Cookie 偏好设置' : 'Cookie Preferences'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 必要Cookie */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-900">
                      {language === 'zh' ? '必要Cookie' : 'Essential Cookies'}
                    </h3>
                    <p className="text-sm text-green-700">
                      {language === 'zh' 
                        ? '这些Cookie对于网站的基本功能是必需的，无法禁用'
                        : 'These cookies are necessary for the basic functionality of the website and cannot be disabled'
                      }
                    </p>
                  </div>
                </div>
                <Switch checked={essentialCookies} disabled />
              </div>

              {/* 分析Cookie */}
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Cookie className="w-5 h-5 text-yellow-600" />
                  <div>
                    <h3 className="font-medium text-yellow-900">
                      {language === 'zh' ? '分析Cookie' : 'Analytics Cookies'}
                    </h3>
                    <p className="text-sm text-yellow-700">
                      {language === 'zh' 
                        ? '帮助我们了解网站使用情况，改善用户体验'
                        : 'Help us understand how the website is used and improve user experience'
                      }
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={analyticsCookies} 
                  onCheckedChange={setAnalyticsCookies}
                />
              </div>

              {/* 营销Cookie */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <Cookie className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-medium text-red-900">
                      {language === 'zh' ? '营销Cookie' : 'Marketing Cookies'}
                    </h3>
                    <p className="text-sm text-red-700">
                      {language === 'zh' 
                        ? '用于个性化广告和再营销目的'
                        : 'Used for personalized advertising and remarketing purposes'
                      }
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={marketingCookies} 
                  onCheckedChange={setMarketingCookies}
                />
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="max-w-4xl mx-auto flex flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-8 py-3 text-sm sm:text-base"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {language === 'zh' ? '保存设置' : 'Save Settings'}
            </Button>
            
            <Button
              onClick={handleResetSettings}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 px-4 sm:px-8 py-3 text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {language === 'zh' ? '重置为拒绝所有' : 'Reset to Reject All'}
            </Button>
          </div>

          {/* 说明信息 */}
          <div className="max-w-4xl mx-auto mt-8 text-center text-sm text-gray-600">
            <p>
              {language === 'zh' 
                ? '您的设置将立即生效。如果您选择拒绝非必要Cookie，网站将进入静默模式，不会收集任何追踪信息。'
                : 'Your settings will take effect immediately. If you choose to reject non-essential cookies, the website will enter silent mode and will not collect any tracking information.'
              }
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
      <FloatingSupport />
    </div>
  );
}
