import React from 'react';
import { Zap, Palette, Sparkles, Clock } from 'lucide-react';

const WhatSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Advanced artificial intelligence transforms your text descriptions into stunning, unique artwork in seconds.',
      color: 'yellow'
    },
    {
      icon: Palette,
      title: 'Multiple Art Styles',
      description: 'Choose from photorealistic, cartoon, oil painting, watercolor, and dozens of other artistic styles.',
      color: 'green'
    },
    {
      icon: Sparkles,
      title: 'High-Quality Output',
      description: 'Generate images in high resolution up to 4K quality, perfect for printing and professional use.',
      color: 'blue'
    },
    {
      icon: Clock,
      title: 'Lightning Fast',
      description: 'Get your custom artwork in under 30 seconds. No waiting, no delays - just instant creativity.',
      color: 'purple'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What is Nano Banana?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nano Banana is a cutting-edge AI-powered platform that transforms your written descriptions 
            into breathtaking visual artwork. Simply describe what you want to see, and Nano Banana&apos;s advanced 
            artificial intelligence will create a unique, high-quality image tailored to your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
              green: 'bg-green-100 text-green-600 border-green-200',
              blue: 'bg-blue-100 text-blue-600 border-blue-200',
              purple: 'bg-purple-100 text-purple-600 border-purple-200'
            };

            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                  <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mx-auto mb-6 border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatSection;