'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Wand2, Brain, Zap, Layers, Code, Settings, Sparkles, Cpu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GoogleFigurinePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Start Action Button */}
        <div className="text-center mb-12 mt-20">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('googleFigurine.cta')}
            </Button>
          </Link>
        </div>

        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('googleFigurine.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('googleFigurine.subtitle')}
          </p>
          
          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.googleAI')}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.googleTech')}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.advancedModel')}</span>
            <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.creativeDesign')}</span>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.smartGeneration')}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('googleFigurine.keywords.innovativeTech')}</span>
          </div>
        </div>

        {/* Featured Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/22.jpg"
              alt="Google Figurine Example 1"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.examples.innovative.title')}</h3>
            <p className="text-gray-600">{t('googleFigurine.examples.innovative.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/23.jpg"
              alt="Google Figurine Example 2"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.examples.advanced.title')}</h3>
            <p className="text-gray-600">{t('googleFigurine.examples.advanced.desc')}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/1.jpg"
              alt="Google Figurine Example 3"
              width={300}
              height={300}
              className="w-full h-80 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.examples.professional.title')}</h3>
            <p className="text-gray-600">{t('googleFigurine.examples.professional.desc')}</p>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.whatIs.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.whatIs.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.whatIs.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('googleFigurine.sections.whatIs.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.coreFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.coreFeatures.advancedAI.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.coreFeatures.advancedAI.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.coreFeatures.creativeGeneration.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.coreFeatures.creativeGeneration.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Layers className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.coreFeatures.multiModal.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.coreFeatures.multiModal.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-100 p-3 rounded-full">
                  <Cpu className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.coreFeatures.smartOptimization.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.coreFeatures.smartOptimization.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.technology.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.technology.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.technology.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('googleFigurine.sections.technology.desc3')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.applications.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('googleFigurine.sections.applications.creative.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('googleFigurine.sections.applications.creative.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('googleFigurine.sections.applications.commercial.title')}</h3>
                <ul className="space-y-3 text-gray-700">
                  {(t('googleFigurine.sections.applications.commercial.items') as unknown as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.advantages.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.advantages.advancedAI.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.advantages.advancedAI.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.advantages.creativeFlexibility.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.advantages.creativeFlexibility.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.advantages.qualityOutput.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.advantages.qualityOutput.desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('googleFigurine.sections.advantages.integration.title')}</h3>
                  <p className="text-gray-700">{t('googleFigurine.sections.advantages.integration.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('googleFigurine.sections.future.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.future.desc1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('googleFigurine.sections.future.desc2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('googleFigurine.sections.future.desc3')}
            </p>
          </div>
        </div>

        {/* End Action Button */}
        <div className="text-center mt-16">
          <Link href="/draw">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <Wand2 className="w-6 h-6 mr-2" />
              {t('googleFigurine.ctaEnd')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
