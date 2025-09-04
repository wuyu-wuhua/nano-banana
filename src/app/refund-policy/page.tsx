"use client";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Shield, 
  CreditCard, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  Mail,
  Calendar,
  Clock,
  Users,
  Lock
} from 'lucide-react';

export default function RefundPolicyPage() {
  const { t, language } = useLanguage();
  const isEnglish = language === 'en';

  const sections = [
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: isEnglish ? 'All Sales Are Final' : '所有销售均为最终交易',
      desc: isEnglish 
        ? 'Due to the instant access nature of digital services, all subscription fees (including monthly/annual fees) are considered final transactions once paid and are non-refundable.'
        : '由于数字服务的即时访问特性，所有订阅费用（包括月费/年费）一旦支付，即视为最终交易，不予退款。',
      details: isEnglish ? [
        'Unused subscription time',
        'Insufficient account usage', 
        'Cancellation due to personal reasons',
        'Service functions meeting descriptions but not meeting user expectations'
      ] : [
        '未使用的订阅时长',
        '账户使用不足',
        '因用户个人原因取消',
        '服务功能符合描述但未达到用户期望'
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
      title: isEnglish ? 'Subscription Cancellation' : '取消订阅说明',
      desc: isEnglish ? 'When you cancel your subscription:' : '当您取消订阅时：',
      details: isEnglish ? [
        'Cancellation only stops future automatic renewals, does not affect current subscription period',
        'Your credits and service access remain valid until current billing cycle ends',
        'Similar to video membership services, you can continue using until subscription period ends'
      ] : [
        '取消订阅仅停止后续自动续费，不影响当前订阅周期',
        '您的积分和服务访问权限在当前计费周期结束前仍然有效',
        '类似视频会员服务，您可继续使用直到订阅期结束'
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
      title: isEnglish ? 'Service Interruption Exception Handling' : '服务中断的异常处理',
      desc: isEnglish ? 'In case of major service interruptions:' : '若发生重大服务中断：',
      details: isEnglish ? [
        'Non-force majeure factors causing over 72-hour major service interruptions, users may apply for equivalent service time compensation',
        'This compensation is the only remedy, no cash refunds involved',
        'Minor interruptions or planned maintenance do not qualify for compensation'
      ] : [
        '非不可抗力因素导致的持续超过72小时的重大服务中断，用户可申请等值服务时长的补偿',
        '此补偿为唯一救济，不涉及现金退款',
        '轻微中断或计划维护不符合补偿条件'
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-500" />,
      title: isEnglish ? 'Dispute Resolution' : '争议解决',
      desc: isEnglish ? 'If you have questions about charges, please contact us within 7 working days:' : '如果您对扣款有任何疑问，请在7个工作日内联系我们：',
      details: isEnglish ? [
        'Contact media@nanobananamodle.com and provide transaction ID',
        'Provide payment vouchers and problem description',
        'We will investigate and provide written response within 15 working days',
        'All dispute resolution results are final decisions'
      ] : [
        '联系 media@nanobananamodle.com 并提供交易ID',
        '提供扣费凭证和问题描述',
        '我们将进行调查并在15个工作日内给予书面答复',
        '所有争议解决结果为最终决定'
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: isEnglish ? 'Policy Modification Rights' : '政策修改权利',
      desc: isEnglish 
        ? 'nano-banana reserves the right to modify this policy at any time. Modified policies will take effect immediately after being publicly published on the website.'
        : 'nano-banana保留随时修改本政策的权利，修改后的政策将在网站上公开发布后立即生效。',
      highlights: isEnglish ? [
        'You have fully understood and accepted this policy',
        'You confirm the special nature of digital services',
        'You agree to waive any right to request refunds'
      ] : [
        '您已充分理解并接受本政策',
        '您确认数字服务的特殊性',
        '您同意放弃任何要求退款的权利'
      ]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
      title: isEnglish ? 'Terms Acknowledgment' : '条款认可',
      desc: isEnglish 
        ? 'By paying subscription fees, you confirm that you have read, understood, and agreed to all terms in this refund policy.'
        : '通过支付订阅费，您确认已阅读、理解并同意本退款政策中的所有条款。'
    },
    {
      icon: <Mail className="w-8 h-8 text-indigo-500" />,
      title: isEnglish ? 'Contact Information' : '联系信息',
      desc: isEnglish ? 'If you have questions about this policy or billing, please contact us:' : '如对此政策或账单有疑问，请联系我们：',
      email: 'media@nanobananamodle.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Refund Policy' : '退款政策'}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">
                {isEnglish ? 'Last Updated: August 10, 2025' : '最后更新日期: 2025-08-10'}
              </span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-lg">
                {isEnglish ? 'All Users' : '所有用户'}
              </span>
            </div>
          </div>
        </div>

        {/* 政策内容 */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* 章节标题 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  {section.icon}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* 章节内容 */}
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {section.desc}
                </p>
                
                {/* 详细列表 */}
                {section.details && (
                  <ul className="space-y-3 mb-4">
                    {section.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* 高亮内容 */}
                {section.highlights && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Lock className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">
                        {isEnglish ? 'Important Notes' : '重要说明'}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {section.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-yellow-800">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* 邮箱链接 */}
                {section.email && (
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-indigo-800">
                        {isEnglish ? 'Email' : '邮箱'}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        const url = 'https://mail.google.com/mail/u/0/?fs=1&to=media@nanobananamodle.com&su=Problem+Feedback&body=Please+describe+the+problem+you+encountered:&tf=cm';
                        window.open(url, '_blank');
                      }}
                      className="text-indigo-600 hover:text-indigo-700 underline font-medium text-lg cursor-pointer hover:no-underline"
                    >
                      {section.email}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isEnglish ? 'Thank you for understanding' : '感谢您的理解'}
            </h3>
            <p className="text-gray-600">
              {isEnglish 
                ? 'By using our services, you acknowledge and agree to this refund policy.'
                : '使用我们的服务即表示您已了解并同意本退款政策。'
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
