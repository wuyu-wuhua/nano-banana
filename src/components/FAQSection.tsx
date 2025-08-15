"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {t(faq.questionKey)}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                                      <p className="text-gray-600 leading-relaxed">
                    {t(faq.answerKey)}
                  </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t('faq.contact')}
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            {t('faq.contactButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;