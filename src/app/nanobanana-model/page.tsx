"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Wand2, Sparkles, Download, Share2, Zap, Target, Brain, Cpu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function NanoBananaModelPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('nanoBananaModel.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('nanoBananaModel.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('nanoBananaModel.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.nanoBanana')}</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.deepLearning')}</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.neuralNetwork')}</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.aiAlgorithm')}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.mlFigurine')}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.smartSystem')}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.aiTraining')}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{t('nanoBananaModel.keywords.autoModeling')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/7.jpg"
              alt="NanoBanana Model Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.examples.smartRecognition.title')}</h3>
            <p className="text-gray-600">{t('nanoBananaModel.examples.smartRecognition.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/8.jpg"
              alt="NanoBanana Model Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.examples.deepLearning.title')}</h3>
            <p className="text-gray-600">{t('nanoBananaModel.examples.deepLearning.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/9.jpg"
              alt="NanoBanana Model Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.examples.multiStyle.title')}</h3>
            <p className="text-gray-600">{t('nanoBananaModel.examples.multiStyle.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.architecture.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.architecture.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.architecture.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('nanoBananaModel.sections.architecture.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.features.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.features.smartUnderstanding.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.features.smartUnderstanding.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Cpu className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.features.efficientProcessing.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.features.efficientProcessing.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.features.preciseModeling.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.features.preciseModeling.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.features.creativeGeneration.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.features.creativeGeneration.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.advantages.title')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.advantages.advanced')}</h3>
                <p className="text-gray-700">{t('nanoBananaModel.sections.advantages.advancedDesc')}</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.advantages.fast')}</h3>
                <p className="text-gray-700">{t('nanoBananaModel.sections.advantages.fastDesc')}</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.advantages.accurate')}</h3>
                <p className="text-gray-700">{t('nanoBananaModel.sections.advantages.accurateDesc')}</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.advantages.flexible')}</h3>
                <p className="text-gray-700">{t('nanoBananaModel.sections.advantages.flexibleDesc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.applications.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('nanoBananaModel.sections.applications.commercial.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('nanoBananaModel.sections.applications.commercial.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('nanoBananaModel.sections.applications.personal.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('nanoBananaModel.sections.applications.personal.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.workflow.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.workflow.inputParsing.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.workflow.inputParsing.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.workflow.featureExtraction.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.workflow.featureExtraction.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.workflow.modelGeneration.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.workflow.modelGeneration.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.workflow.qualityOptimization.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.workflow.qualityOptimization.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('nanoBananaModel.sections.workflow.outputDelivery.title')}</h3>
                  <p className="text-gray-700">{t('nanoBananaModel.sections.workflow.outputDelivery.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.innovation.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.innovation.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.innovation.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('nanoBananaModel.sections.innovation.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('nanoBananaModel.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('nanoBananaModel.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('nanoBananaModel.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('nanoBananaModel.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
