import React from 'react';
import { Shield, Users, Award, Rocket } from 'lucide-react';

const WhySection: React.FC = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your prompts and generated images are completely private. We never store or share your creative content without permission.',
      stats: '100% Private'
    },
    {
      icon: Users,
      title: 'Trusted by Creators',
      description: 'Join over 500,000 artists, designers, and creators who rely on Nano Banana for their creative projects.',
      stats: '500K+ Users'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: 'Our AI models are trained on the latest technology, delivering superior quality compared to other platforms.',
      stats: '4.9/5 Rating'
    },
    {
      icon: Rocket,
      title: 'Constantly Improving',
      description: 'We regularly update our AI models and add new features based on user feedback and technological advances.',
      stats: 'Weekly Updates'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Nano Banana?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We&apos;re not just another AI image generator. Nano Banana combines cutting-edge technology 
            with user-focused design to deliver the best text-to-image experience available today. Choose Nano Banana for superior AI art generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            return (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {reason.title}
                    </h3>
                    <span className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {reason.stats}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">99.9%</div>
              <div className="text-gray-600 text-sm">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
              <div className="text-gray-600 text-sm">Images Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-gray-600 text-sm">Art Styles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;