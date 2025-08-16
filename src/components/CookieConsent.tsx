"use client"

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Cookie, Shield, Settings, Check } from 'lucide-react';
import { Button } from './ui/button';

interface CookieConsentProps {}

const CookieConsent: React.FC<CookieConsentProps> = () => {
  const { t, language } = useLanguage();
  const [showConsent, setShowConsent] = useState(false);
  const [showCustomPreferences, setShowCustomPreferences] = useState(false);
  const [userChoice, setUserChoice] = useState<'accepted' | 'rejected' | null>(null);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // 始终启用
    functional: false,
    analytics: false,
    performance: false,
    marketing: false
  });

  useEffect(() => {
    // 检查用户是否已经做出选择
    const consentChoice = localStorage.getItem('nano_cookie_consent');
    if (!consentChoice) {
      setShowConsent(true);
    } else {
      setUserChoice(consentChoice as 'accepted' | 'rejected');
      applyCookiePolicy(consentChoice as 'accepted' | 'rejected');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 应用Cookie策略的核心函数
  const applyCookiePolicy = (choice: 'accepted' | 'rejected') => {
    if (choice === 'rejected') {
      // 拒绝模式：阻止所有非必要脚本和Cookie
      blockAllTrackingScripts();
      blockAllTrackingCookies();
      enableSilentMode();
    } else {
      // 接受模式：允许所有脚本
      allowAllScripts();
      allowAllCookies();
    }
  };

  // 阻止所有追踪脚本
  const blockAllTrackingScripts = () => {
    // 阻止Google Analytics
    (window as any)['ga-disable-G-6KPSN56CS9'] = true;
    
    // 阻止Google Tag Manager
    if ((window as any).dataLayer) {
      (window as any).dataLayer = [];
    }
    
    // 阻止Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq = () => {};
    }
    
    // 阻止Hotjar
    if ((window as any).hj) {
      (window as any).hj = () => {};
    }
    
    // 阻止其他常见追踪器
    const trackingScripts = [
      'gtag',
      'fbq', 
      'twq',
      'snap',
      'pintrk',
      'ttq',
      'linkedin',
      'pinterest'
    ];
    
    trackingScripts.forEach(tracker => {
      if ((window as any)[tracker]) {
        (window as any)[tracker] = () => {};
      }
    });
  };

  // 阻止所有追踪Cookie
  const blockAllTrackingCookies = () => {
    // 删除所有非必要的追踪Cookie
    const cookiesToRemove = [
      '_ga',
      '_gid',
      '_gat',
      '_fbp',
      '_fbc',
      'hotjar',
      'amplitude',
      'mixpanel',
      'segment',
      'optimizely',
      'vwo'
    ];
    
    cookiesToRemove.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    });
  };

  // 启用静默模式
  const enableSilentMode = () => {
    // 设置静默模式标记
    localStorage.setItem('nano_silent_mode', 'true');
    
    // 阻止动态加载的追踪脚本
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(document, tagName);
      
      if (tagName.toLowerCase() === 'script') {
        // 拦截script标签的src设置
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name: string, value: string) {
          if (name === 'src' && isTrackingScript(value)) {
            // 阻止追踪脚本加载
            return;
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      
      return element;
    };
  };

  // 检查是否为追踪脚本
  const isTrackingScript = (src: string): boolean => {
    const trackingDomains = [
      'google-analytics.com',
      'googletagmanager.com',
      'facebook.net',
      'hotjar.com',
      'amplitude.com',
      'mixpanel.com',
      'segment.com',
      'optimizely.com',
      'vwo.com',
      'doubleclick.net',
      'googlesyndication.com'
    ];
    
    return trackingDomains.some(domain => src.includes(domain));
  };

  // 允许所有脚本
  const allowAllScripts = () => {
    localStorage.setItem('nano_silent_mode', 'false');
    // 恢复正常的脚本加载
    document.createElement = document.createElement.bind(document);
  };

  // 允许所有Cookie
  const allowAllCookies = () => {
    // 移除静默模式标记
    localStorage.removeItem('nano_silent_mode');
  };

  // 处理用户选择
  const handleChoice = (choice: 'accepted' | 'rejected') => {
    setUserChoice(choice);
    setShowConsent(false);
    
    // 保存用户选择
    localStorage.setItem('nano_cookie_consent', choice);
    
    // 应用Cookie策略
    applyCookiePolicy(choice);
    
    // 记录用户选择（仅用于合规目的，不追踪）
    console.log(`Cookie consent: ${choice}`);
  };

  // 处理自定义偏好设置
  const handleCustomPreferences = () => {
    const hasAcceptedCookies = cookiePreferences.functional || cookiePreferences.analytics || cookiePreferences.performance || cookiePreferences.marketing;
    
    if (hasAcceptedCookies) {
      // 用户同意某些Cookie
      localStorage.setItem('nano_cookie_consent', 'accepted');
      localStorage.setItem('nano_silent_mode', 'false');
      allowAllScripts();
      allowAllCookies();
    } else {
      // 用户拒绝所有非必要Cookie
      localStorage.setItem('nano_cookie_consent', 'rejected');
      blockAllTrackingScripts();
      blockAllTrackingCookies();
      enableSilentMode();
    }
    
    localStorage.setItem('nano_cookie_preferences', JSON.stringify(cookiePreferences));
    setShowCustomPreferences(false);
    setShowConsent(false);
    setUserChoice(hasAcceptedCookies ? 'accepted' : 'rejected');
    
    // 重新加载页面以应用新的Cookie设置
    window.location.reload();
  };

  // 如果用户已经做出选择，不显示弹窗
  if (userChoice !== null) {
    return null;
  }

  return (
    <>
      {/* 主Cookie同意弹窗 */}
      {showConsent && !showCustomPreferences && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              {/* 左侧图标 */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-blue-600" />
              </div>
              
              {/* 中间内容 */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'zh' ? 'Cookie 使用同意' : 'Cookie Consent'}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {language === 'zh' 
                    ? '我们使用Cookie来改善您的浏览体验、分析网站流量并了解您如何使用我们的服务。点击"接受全部"，即表示您同意我们使用所有类型的Cookie。您也可以选择"自定义偏好"来管理特定的Cookie设置。'
                    : 'We use cookies to improve your browsing experience, analyze website traffic, and understand how you use our services. By clicking "Accept All", you consent to our use of all types of cookies. You can also choose "Custom Preferences" to manage specific cookie settings.'
                  }
                </p>
                
                {/* 按钮组 */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleChoice('accepted')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-medium"
                  >
                    {language === 'zh' ? '接受全部' : 'Accept All'}
                  </Button>
                  <Button
                    onClick={() => setShowCustomPreferences(true)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 font-medium"
                  >
                    {language === 'zh' ? '自定义偏好' : 'Custom Preferences'}
                  </Button>
                  <Button
                    onClick={() => handleChoice('rejected')}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 font-medium"
                  >
                    {language === 'zh' ? '全部拒绝' : 'Reject All'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 自定义偏好设置弹窗 */}
      {showCustomPreferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'zh' ? '自定义Cookie偏好设置' : 'Custom Consent Preferences'}
              </h2>
              <button
                onClick={() => setShowCustomPreferences(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cookie类别列表 */}
            <div className="p-6 space-y-4">
              {/* 必要Cookie */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '必要' : 'Necessary'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' 
                        ? '必要Cookie对于启用基本网站功能至关重要，例如提供安全登录或调整您的同意偏好设置。这些Cookie不存储任何个人身份数据。'
                        : 'Necessary cookies are essential for enabling basic website functionality, such as providing secure login or adjusting your consent preference settings. These cookies do not store any personally identifiable data.'
                      }
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {language === 'zh' ? '始终启用' : 'Always Active'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 功能Cookie */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '功能' : 'Functional'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' 
                        ? '功能Cookie帮助执行某些功能，例如在社交媒体平台上分享网站内容、收集反馈和其他第三方功能。'
                        : 'Functional cookies help perform certain functions, such as sharing website content on social media platforms, collecting feedback, and other third-party functions.'
                      }
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.functional}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, functional: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              {/* 分析Cookie */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '分析' : 'Analytics'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' 
                        ? '分析Cookie用于了解访问者如何与网站互动。这些Cookie帮助提供有关访问者数量、跳出率、流量来源和其他指标的信息。'
                        : 'Analytics cookies are used to understand how visitors interact with the website. These cookies help provide information about visitor numbers, bounce rates, traffic sources, and other metrics.'
                      }
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              {/* 性能Cookie */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '性能' : 'Performance'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' 
                        ? '性能Cookie用于理解和分析网站的关键性能指标，帮助为访问者提供更好的用户体验。'
                        : 'Performance cookies are used to understand and analyze key performance metrics of the website, helping to provide visitors with a better user experience.'
                      }
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.performance}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, performance: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </div>
              </div>

              {/* 营销Cookie */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '营销' : 'Marketing'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'zh' 
                        ? '营销Cookie用于为访问者提供定制化的广告体验，包括个性化内容和相关推荐。'
                        : 'Marketing cookies are used to provide visitors with customized advertising experiences, including personalized content and relevant recommendations.'
                      }
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                onClick={() => setShowCustomPreferences(false)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </Button>
              <Button
                onClick={handleCustomPreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {language === 'zh' ? '保存偏好设置' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
