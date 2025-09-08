"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Wand2, Sparkles, Download, Share2, Zap, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GenerateFigurinePage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('generateFigurine.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('generateFigurine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('generateFigurine.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.generator')}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.d3dModel')}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.digitalSculpture')}</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.virtualFigurine')}</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.customFigurine')}</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.smartModeling')}</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.creativeFigurine')}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{t('generateFigurine.keywords.designSoftware')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/4.jpg"
              alt="Figurine Generation Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.examples.scifi.title')}</h3>
            <p className="text-gray-600">{t('generateFigurine.examples.scifi.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/5.jpg"
              alt="Figurine Generation Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.examples.fantasy.title')}</h3>
            <p className="text-gray-600">{t('generateFigurine.examples.fantasy.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/6.jpg"
              alt="Figurine Generation Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.examples.retro.title')}</h3>
            <p className="text-gray-600">{t('generateFigurine.examples.retro.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.technology.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('generateFigurine.sections.technology.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('generateFigurine.sections.technology.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('generateFigurine.sections.technology.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.coreFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.coreFeatures.smartRecognition.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.coreFeatures.smartRecognition.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.coreFeatures.preciseModeling.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.coreFeatures.preciseModeling.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.coreFeatures.styleTransfer.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.coreFeatures.styleTransfer.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Download className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.coreFeatures.multiFormat.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.coreFeatures.multiFormat.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.applications.title')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.applications.gameDev.title')}</h3>
                <p className="text-gray-700">{t('generateFigurine.sections.applications.gameDev.desc')}</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.applications.filmProduction.title')}</h3>
                <p className="text-gray-700">{t('generateFigurine.sections.applications.filmProduction.desc')}</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.applications.figureMaking.title')}</h3>
                <p className="text-gray-700">{t('generateFigurine.sections.applications.figureMaking.desc')}</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.applications.education.title')}</h3>
                <p className="text-gray-700">{t('generateFigurine.sections.applications.education.desc')}</p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.applications.personalCreation.title')}</h3>
                <p className="text-gray-700">{t('generateFigurine.sections.applications.personalCreation.desc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.workflow.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.workflow.dataPreprocessing.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.workflow.dataPreprocessing.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.workflow.featureAnalysis.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.workflow.featureAnalysis.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.workflow.d3dModeling.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.workflow.d3dModeling.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.workflow.qualityOptimization.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.workflow.qualityOptimization.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('generateFigurine.sections.workflow.formatConversion.title')}</h3>
                  <p className="text-gray-700">{t('generateFigurine.sections.workflow.formatConversion.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.advantages.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('generateFigurine.sections.advantages.technicalAdvantages.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('generateFigurine.sections.advantages.technicalAdvantages.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('generateFigurine.sections.advantages.applicationAdvantages.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('generateFigurine.sections.advantages.applicationAdvantages.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('generateFigurine.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('generateFigurine.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('generateFigurine.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('generateFigurine.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('generateFigurine.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
