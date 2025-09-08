'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import  Header  from '@/components/Header';
import  Footer  from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Wand2, Brain, Zap, Layers, Code, Settings, Sparkles, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GeminiFigurinePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('geminiFigurine.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('geminiFigurine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('geminiFigurine.subtitle')}
          </p>
          
          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.geminiModel')}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.googleTech')}</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.advancedAI')}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.creativeDesign')}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.smartGeneration')}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('geminiFigurine.keywords.innovativeTech')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/19.jpg"
              alt="Gemini Figurine Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.examples.innovative.title')}</h3>
            <p className="text-gray-600">{t('geminiFigurine.examples.innovative.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/20.jpg"
              alt="Gemini Figurine Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.examples.advanced.title')}</h3>
            <p className="text-gray-600">{t('geminiFigurine.examples.advanced.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/21.jpg"
              alt="Gemini Figurine Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.examples.professional.title')}</h3>
            <p className="text-gray-600">{t('geminiFigurine.examples.professional.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.whatIs.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.whatIs.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.whatIs.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('geminiFigurine.sections.whatIs.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.coreFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.coreFeatures.advancedModel.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.coreFeatures.advancedModel.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.coreFeatures.creativeGeneration.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.coreFeatures.creativeGeneration.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-100 p-3 rounded-full">
                  <Layers className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.coreFeatures.multiModal.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.coreFeatures.multiModal.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.coreFeatures.smartOptimization.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.coreFeatures.smartOptimization.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.technology.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.technology.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.technology.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('geminiFigurine.sections.technology.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.applications.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('geminiFigurine.sections.applications.creative.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('geminiFigurine.sections.applications.creative.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('geminiFigurine.sections.applications.commercial.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('geminiFigurine.sections.applications.commercial.items') as unknown as string[]).map((item: string, index: number) => (
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.advantages.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.advantages.advancedAI.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.advantages.advancedAI.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.advantages.creativeFlexibility.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.advantages.creativeFlexibility.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.advantages.qualityOutput.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.advantages.qualityOutput.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('geminiFigurine.sections.advantages.integration.title')}</h3>
                  <p className="text-gray-700">{t('geminiFigurine.sections.advantages.integration.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('geminiFigurine.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('geminiFigurine.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('geminiFigurine.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('geminiFigurine.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
