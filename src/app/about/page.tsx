"use client"

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-4 py-2 mb-6">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium">{t('about.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">❤️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{t('about.mission.title')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('about.mission.desc')}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{t('about.vision.title')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('about.vision.desc')}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">✨</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('about.feature1.title')}</h4>
            <p className="text-gray-600">
              {t('about.feature1.desc')}
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">👥</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('about.feature2.title')}</h4>
            <p className="text-gray-600">
              {t('about.feature2.desc')}
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🛡️</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('about.feature3.title')}</h4>
            <p className="text-gray-600">
              {t('about.feature3.desc')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">10M+</div>
            <div className="text-gray-600">{t('about.stats.images')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
            <div className="text-gray-600">{t('about.stats.users')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">{t('about.stats.uptime')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">{t('about.stats.support')}</div>
          </div>
        </div>

        {/* Team & Values */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values.title')}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 text-2xl">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.value1.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('about.values.value1.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">❤️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.value2.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('about.values.value2.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('about.values.value3.title')}</h4>
              <p className="text-gray-600 text-sm">
                {t('about.values.value3.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
