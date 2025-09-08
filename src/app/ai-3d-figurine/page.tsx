'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Wand2, Brain, Zap, Layers, Code, Settings, Sparkles, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AI3DFigurinePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('ai3DFigurine.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('ai3DFigurine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('ai3DFigurine.subtitle')}
          </p>
          
          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.ai3D')}</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.threeDimensional')}</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.advancedModel')}</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.creativeDesign')}</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.smartGeneration')}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{t('ai3DFigurine.keywords.innovativeTech')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/5.jpg"
              alt="AI 3D Figurine Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.examples.innovative.title')}</h3>
            <p className="text-gray-600">{t('ai3DFigurine.examples.innovative.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/6.jpg"
              alt="AI 3D Figurine Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.examples.advanced.title')}</h3>
            <p className="text-gray-600">{t('ai3DFigurine.examples.advanced.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/7.jpg"
              alt="AI 3D Figurine Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.examples.professional.title')}</h3>
            <p className="text-gray-600">{t('ai3DFigurine.examples.professional.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.whatIs.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.whatIs.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.whatIs.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('ai3DFigurine.sections.whatIs.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.coreFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.coreFeatures.advancedAI.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.coreFeatures.advancedAI.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.coreFeatures.creativeGeneration.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.coreFeatures.creativeGeneration.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Layers className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.coreFeatures.multiModal.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.coreFeatures.multiModal.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Cpu className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.coreFeatures.smartOptimization.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.coreFeatures.smartOptimization.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.technology.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.technology.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.technology.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('ai3DFigurine.sections.technology.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.applications.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('ai3DFigurine.sections.applications.creative.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('ai3DFigurine.sections.applications.creative.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('ai3DFigurine.sections.applications.commercial.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('ai3DFigurine.sections.applications.commercial.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.advantages.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.advantages.advancedAI.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.advantages.advancedAI.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.advantages.creativeFlexibility.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.advantages.creativeFlexibility.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.advantages.qualityOutput.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.advantages.qualityOutput.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ai3DFigurine.sections.advantages.integration.title')}</h3>
                  <p className="text-gray-700">{t('ai3DFigurine.sections.advantages.integration.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ai3DFigurine.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('ai3DFigurine.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('ai3DFigurine.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('ai3DFigurine.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
