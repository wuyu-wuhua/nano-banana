"use client"

import React from 'react';
import { Shield, Users, Award, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhySection: React.FC = () => {
  const { t } = useLanguage();
  
  const reasons = [
    {
      icon: Shield,
      titleKey: 'why.reason1.title',
      descKey: 'why.reason1.desc',
      statsKey: 'why.reason1.stats'
    },
    {
      icon: Users,
      titleKey: 'why.reason2.title',
      descKey: 'why.reason2.desc',
      statsKey: 'why.reason2.stats'
    },
    {
      icon: Award,
      titleKey: 'why.reason3.title',
      descKey: 'why.reason3.desc',
      statsKey: 'why.reason3.stats'
    },
    {
      icon: Rocket,
      titleKey: 'why.reason4.title',
      descKey: 'why.reason4.desc',
      statsKey: 'why.reason4.stats'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('why.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            {t('why.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:text-left sm:space-x-6 group">
                <div className="flex-shrink-0 flex justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col items-center sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                      {t(reason.titleKey)}
                    </h3>
                    <span className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
                      {t(reason.statsKey)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-gray-600 leading-relaxed px-2 sm:px-0">
                    {t(reason.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2">99.9%</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('why.stats.uptime')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('why.stats.support')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">10M+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('why.stats.images')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">150+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('why.stats.styles')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;