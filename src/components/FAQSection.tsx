"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { openFloatingSupport } from './FloatingSupport';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      questionKey: 'faq.q1',
      answerKey: 'faq.a1'
    },
    {
      questionKey: 'faq.q2',
      answerKey: 'faq.a2'
    },
    {
      questionKey: 'faq.q3',
      answerKey: 'faq.a3'
    },
    {
      questionKey: 'faq.q4',
      answerKey: 'faq.a4'
    },
    {
      questionKey: 'faq.q5',
      answerKey: 'faq.a5'
    },
    {
      questionKey: 'faq.q6',
      answerKey: 'faq.a6'
    },
    {
      questionKey: 'faq.q7',
      answerKey: 'faq.a7'
    },
    {
      questionKey: 'faq.q8',
      answerKey: 'faq.a8'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('faq.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2 sm:pr-4 leading-tight">
                  {t(faq.questionKey)}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {t(faq.answerKey)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4 sm:px-0">
            {t('faq.contact')}
          </p>
          <button 
            onClick={openFloatingSupport}
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
          >
            {t('faq.contactButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;