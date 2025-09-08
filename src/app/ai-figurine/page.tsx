"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Wand2, Sparkles, Download, Share2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AIFigurinePage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('aiFigurine.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('aiFigurine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aiFigurine.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.aiFigurine')}</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.d3dFigurine')}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.aiModeling')}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.smartDesign')}</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.aiHandmade')}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.digitalFigurine')}</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.mlModeling')}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{t('aiFigurine.keywords.smart3dPrint')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/1.jpg"
              alt="AI Figurine Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.examples.anime.title')}</h3>
            <p className="text-gray-600">{t('aiFigurine.examples.anime.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/2.jpg"
              alt="AI Figurine Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.examples.realistic.title')}</h3>
            <p className="text-gray-600">{t('aiFigurine.examples.realistic.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/3.jpg"
              alt="AI Figurine Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.examples.qversion.title')}</h3>
            <p className="text-gray-600">{t('aiFigurine.examples.qversion.desc')}</p>
          </div>
        </div>

        {/* 详细内容 */}
        <div className="max-w-4xl mx-auto">
           <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
             <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('aiFigurine.sections.whatIs.title')}</h2>
             <p className="text-lg text-gray-700 leading-relaxed mb-6">
               {t('aiFigurine.sections.whatIs.desc1')}
             </p>
             <p className="text-lg text-gray-700 leading-relaxed mb-6">
               {t('aiFigurine.sections.whatIs.desc2')}
             </p>
           </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('aiFigurine.sections.advantages.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.advantages.smart')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.advantages.smartDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.advantages.fast')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.advantages.fastDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Share2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.advantages.quality')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.advantages.qualityDesc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Wand2 className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.advantages.creative')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.advantages.creativeDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('aiFigurine.sections.applications.title')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.applications.personal')}</h3>
                <p className="text-gray-700">{t('aiFigurine.sections.applications.personalDesc')}</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.applications.commercial')}</h3>
                <p className="text-gray-700">{t('aiFigurine.sections.applications.commercialDesc')}</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.applications.education')}</h3>
                <p className="text-gray-700">{t('aiFigurine.sections.applications.educationDesc')}</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.applications.gift')}</h3>
                <p className="text-gray-700">{t('aiFigurine.sections.applications.giftDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('aiFigurine.sections.howToUse.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.howToUse.step1')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.howToUse.step1Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.howToUse.step2')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.howToUse.step2Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.howToUse.step3')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.howToUse.step3Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('aiFigurine.sections.howToUse.step4')}</h3>
                  <p className="text-gray-700">{t('aiFigurine.sections.howToUse.step4Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('aiFigurine.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('aiFigurine.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('aiFigurine.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('aiFigurine.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* 结尾行动按钮 */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('aiFigurine.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
