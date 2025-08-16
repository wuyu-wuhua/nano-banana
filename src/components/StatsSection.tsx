"use client"

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">1M+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">{t('stats.images')}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">{t('stats.users')}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">4.9★</div>
            <div className="text-sm sm:text-base text-gray-700 font-medium">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;