"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Wand2, Sparkles, Download, Share2, Zap, Target, Brain, Cpu, Command, Terminal } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function FigurineAICommandPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('figurineAICommand.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('figurineAICommand.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('figurineAICommand.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.aiCommand')}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.generationCommand')}</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.smartSystem')}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.parameterAdjust')}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.designCommand')}</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.creationControl')}</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.modelingCommand')}</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t('figurineAICommand.keywords.customCommand')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/10.jpg"
              alt="AI Command Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.examples.basic.title')}</h3>
            <p className="text-gray-600">{t('figurineAICommand.examples.basic.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/11.jpg"
              alt="AI Command Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.examples.advanced.title')}</h3>
            <p className="text-gray-600">{t('figurineAICommand.examples.advanced.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/12.jpg"
              alt="AI Command Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.examples.professional.title')}</h3>
            <p className="text-gray-600">{t('figurineAICommand.examples.professional.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.whatIs.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('figurineAICommand.sections.whatIs.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('figurineAICommand.sections.whatIs.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('figurineAICommand.sections.whatIs.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.coreFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Command className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.coreFeatures.preciseControl.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.coreFeatures.preciseControl.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Terminal className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.coreFeatures.flexibleCombination.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.coreFeatures.flexibleCombination.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.coreFeatures.smartUnderstanding.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.coreFeatures.smartUnderstanding.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.coreFeatures.fastResponse.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.coreFeatures.fastResponse.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.commandTypes.title')}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.commandTypes.appearance.title')}</h3>
                <p className="text-gray-700">{t('figurineAICommand.sections.commandTypes.appearance.desc')}</p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-800">{t('figurineAICommand.sections.commandTypes.appearance.example')}</code>
                </div>
              </div>
              
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.commandTypes.style.title')}</h3>
                <p className="text-gray-700">{t('figurineAICommand.sections.commandTypes.style.desc')}</p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-800">{t('figurineAICommand.sections.commandTypes.style.example')}</code>
                </div>
              </div>
              
              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.commandTypes.material.title')}</h3>
                <p className="text-gray-700">{t('figurineAICommand.sections.commandTypes.material.desc')}</p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-800">{t('figurineAICommand.sections.commandTypes.material.example')}</code>
                </div>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.commandTypes.pose.title')}</h3>
                <p className="text-gray-700">{t('figurineAICommand.sections.commandTypes.pose.desc')}</p>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-800">{t('figurineAICommand.sections.commandTypes.pose.example')}</code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.advancedTechniques.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.advancedTechniques.weightControl.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.advancedTechniques.weightControl.desc')}</p>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <code className="text-sm text-gray-800">{t('figurineAICommand.sections.advancedTechniques.weightControl.example')}</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.advancedTechniques.negativeCommand.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.advancedTechniques.negativeCommand.desc')}</p>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <code className="text-sm text-gray-800">{t('figurineAICommand.sections.advancedTechniques.negativeCommand.example')}</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.advancedTechniques.combinationCommand.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.advancedTechniques.combinationCommand.desc')}</p>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <code className="text-sm text-gray-800">{t('figurineAICommand.sections.advancedTechniques.combinationCommand.example')}</code>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('figurineAICommand.sections.advancedTechniques.referenceCommand.title')}</h3>
                  <p className="text-gray-700">{t('figurineAICommand.sections.advancedTechniques.referenceCommand.desc')}</p>
                  <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                    <code className="text-sm text-gray-800">{t('figurineAICommand.sections.advancedTechniques.referenceCommand.example')}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.optimizationStrategies.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('figurineAICommand.sections.optimizationStrategies.writingTips.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('figurineAICommand.sections.optimizationStrategies.writingTips.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('figurineAICommand.sections.optimizationStrategies.debuggingMethods.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('figurineAICommand.sections.optimizationStrategies.debuggingMethods.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.practicalExamples.title')}</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('figurineAICommand.sections.practicalExamples.anime.title')}</h3>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <code className="text-sm text-gray-800">
                    {t('figurineAICommand.sections.practicalExamples.anime.example')}
                  </code>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('figurineAICommand.sections.practicalExamples.scifi.title')}</h3>
                <div className="bg-white p-4 rounded-lg border-l-4 border-teal-500">
                  <code className="text-sm text-gray-800">
                    {t('figurineAICommand.sections.practicalExamples.scifi.example')}
                  </code>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('figurineAICommand.sections.practicalExamples.realistic.title')}</h3>
                <div className="bg-white p-4 rounded-lg border-l-4 border-cyan-500">
                  <code className="text-sm text-gray-800">
                    {t('figurineAICommand.sections.practicalExamples.realistic.example')}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('figurineAICommand.sections.futureDevelopment.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('figurineAICommand.sections.futureDevelopment.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('figurineAICommand.sections.futureDevelopment.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('figurineAICommand.sections.futureDevelopment.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('figurineAICommand.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
