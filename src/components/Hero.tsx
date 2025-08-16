"use client"

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Background decorative elements - 移动端隐藏或缩小 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left relative z-10 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 shadow-sm border border-yellow-200">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">AI-Powered Art Generation</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <a 
                href="/draw"
                className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center flex-1 sm:flex-none"
              >
                {t('hero.cta')}
              </a>
              <button className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-yellow-500 hover:text-yellow-600 transform hover:scale-105 transition-all duration-200 flex-1 sm:flex-none">
                {t('hero.learnMore')}
              </button>
            </div>
          </div>

          {/* Right side - Visual content */}
          <div className="relative z-10 order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Main showcase image */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-white/50">
                <img 
                  src="/images/2.png" 
                  alt="AI Generated Art Example"
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                />
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">{t('draw.prompt')}</p>
                  <p className="text-sm sm:text-base text-gray-700 italic px-2">&ldquo;{t('hero.examplePrompt')}&rdquo;</p>
                </div>
              </div>
              
              {/* Floating sample images - 移动端隐藏或调整位置 */}
              <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <img 
                  src="/images/1.png" 
                  alt="Sample 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                <img 
                  src="/images/3.png" 
                  alt="Sample 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute top-1/2 -right-6 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white transform rotate-45 hover:rotate-12 transition-transform duration-300">
                <img 
                  src="/images/4.png" 
                  alt="Sample 3"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;