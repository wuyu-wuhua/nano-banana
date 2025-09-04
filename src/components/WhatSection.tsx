"use client"

import React from 'react';
import { Zap, Palette, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatSection: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Zap,
      titleKey: 'what.feature1.title',
      descKey: 'what.feature1.desc',
      color: 'yellow'
    },
    {
      icon: Palette,
      titleKey: 'what.feature2.title',
      descKey: 'what.feature2.desc',
      color: 'green'
    },
    {
      icon: Sparkles,
      titleKey: 'what.feature3.title',
      descKey: 'what.feature3.desc',
      color: 'blue'
    },
    {
      icon: Clock,
      titleKey: 'what.feature4.title',
      descKey: 'what.feature4.desc',
      color: 'purple'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-0">
            {t('what.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
            {t('what.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
              green: 'bg-green-100 text-green-600 border-green-200',
              blue: 'bg-blue-100 text-blue-600 border-blue-200',
              purple: 'bg-purple-100 text-purple-600 border-purple-200'
            };

            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 px-1 sm:px-2 lg:px-0">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed px-1 sm:px-2 lg:px-0">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatSection;