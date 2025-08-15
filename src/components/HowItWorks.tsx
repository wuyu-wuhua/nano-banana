"use client"

import React from 'react';
import { PenTool, Palette, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: PenTool,
      titleKey: 'how.step1.title',
      descKey: 'how.step1.desc',
      color: 'yellow'
    },
    {
      icon: Palette,
      titleKey: 'how.step2.title',
      descKey: 'how.step2.desc',
      color: 'green'
    },
    {
      icon: Download,
      titleKey: 'how.step3.title',
      descKey: 'how.step3.desc',
      color: 'blue'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('how.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
              green: 'bg-green-100 text-green-600 border-green-200',
              blue: 'bg-blue-100 text-blue-600 border-blue-200'
            };

            return (
              <div key={index} className="relative text-center group">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colorClasses[step.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-6 border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-t-2 border-r-2 border-gray-300 transform rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;