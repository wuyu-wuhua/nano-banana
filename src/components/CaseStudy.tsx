"use client"

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

const CaseStudy: React.FC = () => {
  const { t } = useLanguage();

  // 案例数据
  const caseStudies = [
    {
      id: 1,
      originalImage: '/images/3-1.png',
      originalTitle: '原始人物设计',
      models: [
        {
          id: 1,
          image: '/images/3.jpg',
          title: '动漫风格手办',
          description: 'Q版可爱风格，适合收藏展示'
        },
        {
          id: 2,
          image: '/images/6.jpg',
          title: '写实风格手办',
          description: '高度还原，细节精致'
        },
        {
          id: 3,
          image: '/images/18.jpg',
          title: '奇幻风格手办',
          description: '魔法元素，充满想象力'
        }
      ]
    },
    {
      id: 2,
      originalImage: '/images/19-1.png',
      originalTitle: '原始人物设计',
      models: [
        {
          id: 1,
          image: '/images/11.jpg',
          title: '机甲风格手办',
          description: '未来科技感，机械细节丰富'
        },
        {
          id: 2,
          image: '/images/14.jpg',
          title: '古典风格手办',
          description: '传统工艺，优雅典雅'
        },
        {
          id: 3,
          image: '/images/19.jpg',
          title: '现代风格手办',
          description: '简约时尚，线条流畅'
        }
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('caseStudy.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            {t('caseStudy.subtitle')}
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20">
          {caseStudies.map((caseStudy, caseIndex) => (
            <div key={caseStudy.id} className="rounded-2xl sm:rounded-3xl p-6 sm:p-8">
        

              {/* 原始图片 */}
              <div className="mb-8 sm:mb-12">
                <div className="text-center mb-4 sm:mb-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {t('caseStudy.originalTitle')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('caseStudy.originalDesc')}
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-48 sm:w-64 md:w-80 h-60 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <Image 
                      src={caseStudy.originalImage} 
                      alt={t('caseStudy.originalTitle')}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 生成的手办模型 */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {caseStudy.models.map((model) => (
                    <div key={model.id} className="group">
                      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="aspect-[4/5] overflow-hidden">
                          <Image 
                            src={model.image} 
                            alt={model.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 说明文字 */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-yellow-200">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              {t('caseStudy.conclusion.title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t('caseStudy.conclusion.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
