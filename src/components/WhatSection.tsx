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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('what.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('what.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="bg-gray-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                  <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-6 border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
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