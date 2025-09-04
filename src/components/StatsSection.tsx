"use client"

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-lg sm:text-2xl lg:text-4xl font-bold text-yellow-600 mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">1M+</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">{t('stats.images')}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-lg sm:text-2xl lg:text-4xl font-bold text-green-600 mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">{t('stats.users')}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-lg sm:text-2xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">4.9★</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;