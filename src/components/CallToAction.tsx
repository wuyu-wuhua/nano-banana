"use client"

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CallToAction: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 border border-white/30">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs sm:text-sm font-medium text-white">{t('cta.badge')}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
            {t('cta.title')}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t('cta.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <a href="/draw" className="bg-white text-gray-900 px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-xl w-auto justify-center">
              <span>{t('cta.button')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <button className="border-2 border-white text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-200 w-auto">
              {t('cta.pricing')}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 opacity-80">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10M+</div>
              <div className="text-white/80 text-xs sm:text-sm">{t('cta.stats.images')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500K+</div>
              <div className="text-white/80 text-xs sm:text-sm">{t('cta.stats.users')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-white/80 text-xs sm:text-sm">{t('cta.stats.uptime')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/80 text-xs sm:text-sm">{t('cta.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;