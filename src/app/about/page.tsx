import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-4 py-2 mb-6">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium">About Nano Banana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing AI Art Creation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nano Banana is at the forefront of AI-powered creativity, empowering artists, designers, and creators 
            to bring their wildest imaginations to life through cutting-edge artificial intelligence technology.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">❤️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize art creation by making professional-grade AI image generation accessible to everyone. 
              We believe that creativity should have no boundaries, and technology should amplify human imagination, 
              not replace it.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where anyone can create stunning artwork in seconds, where ideas flow freely from mind to 
              canvas, and where AI serves as the ultimate creative companion for human expression and innovation.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">✨</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Advanced AI Technology</h4>
            <p className="text-gray-600">
              Powered by state-of-the-art machine learning models, delivering high-quality, 
              creative, and unique artwork generation.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">👥</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">User-Centric Design</h4>
            <p className="text-gray-600">
              Intuitive interface designed for creators of all skill levels, from beginners 
              to professional artists and designers.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🛡️</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Privacy & Security</h4>
            <p className="text-gray-600">
              Enterprise-grade security measures to protect your creative work and ensure 
              your intellectual property remains safe.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">10M+</div>
            <div className="text-gray-600">Images Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Team & Values */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Nano Banana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 text-2xl">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                We strive for excellence in every aspect of our service, from AI quality to user experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">❤️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Creativity</h4>
              <p className="text-gray-600 text-sm">
                We celebrate and nurture creativity, believing it's the foundation of human progress.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 text-sm">
                We build and support a vibrant community of creators, artists, and innovators.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
