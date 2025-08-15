"use client"

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-6 py-3 mb-6">
              <span className="text-lg">📋</span>
              <span className="font-semibold">{t('terms.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {t('terms.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('terms.lastUpdated')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-12">
            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                  {t('terms.section1.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border-l-4 border-red-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('terms.section1.desc')}
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {t('terms.section2.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border-l-4 border-orange-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section2.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section2.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section2.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section2.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section2.item4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section2.item5')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {t('terms.section3.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section3.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item5')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section3.item6')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {t('terms.section4.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-l-4 border-amber-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section4.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item4')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item5')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section4.item6')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                  {t('terms.section5.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-l-4 border-cyan-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section5.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section5.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section5.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section5.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section5.item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
                  {t('terms.section6.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 border-l-4 border-violet-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section6.desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section6.item1')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section6.item2')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section6.item3')}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">{t('terms.section6.item4')}</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  7
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
                  {t('terms.section7.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border-l-4 border-rose-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('terms.section7.desc')}
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  8
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  {t('terms.section8.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border-l-4 border-sky-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('terms.section8.desc')}
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  9
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                  {t('terms.section9.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {t('terms.section9.desc')}
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-lg">📞</span>
                    </div>
                    <p className="text-emerald-800 font-semibold text-lg">{t('terms.section9.email')}</p>
                  </div>
                  <p className="text-emerald-600 text-sm">
                    {t('terms.section9.response')}
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
