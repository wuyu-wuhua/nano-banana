import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/30">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Start Creating Today</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to create your{' '}
            <span className="relative">
              masterpiece?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who are already turning their ideas into stunning artwork with Nano Banana. 
            Your next masterpiece is just a prompt away with Nano Banana AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/draw" className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-xl">
              <span>Start Generating</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-200">
              View Pricing
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10M+</div>
              <div className="text-white/80 text-sm">Images Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500K+</div>
              <div className="text-white/80 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-white/80 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/80 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;