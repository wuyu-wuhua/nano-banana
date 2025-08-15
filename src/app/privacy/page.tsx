"use client"

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-6 py-3 mb-6">
              <span className="text-lg">🔒</span>
              <span className="font-semibold">{t('privacy.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {t('privacy.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('privacy.lastUpdated')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-12">
            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {t('privacy.section1.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section1.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section1.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section1.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section1.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section1.item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {t('privacy.section2.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-l-4 border-green-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section2.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section2.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section2.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section2.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section2.item4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section2.item5')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  {t('privacy.section3.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section3.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section3.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section3.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section3.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section3.item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  {t('privacy.section4.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section4.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section4.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section4.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section4.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section4.item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {t('privacy.section5.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border-l-4 border-indigo-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section5.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section5.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section5.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section5.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section5.item4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">{t('privacy.section5.item5')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                  {t('privacy.section6.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-8 border-l-4 border-teal-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('privacy.section6.desc')}
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 text-lg">📧</span>
                    </div>
                    <p className="text-teal-800 font-semibold text-lg">{t('privacy.section6.email')}</p>
                  </div>
                  <p className="text-teal-600 text-sm">
                    {t('privacy.section6.response')}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
