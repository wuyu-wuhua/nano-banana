import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-6 py-3 mb-6">
              <span className="text-lg">📋</span>
              <span className="font-semibold">Legal & Terms</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">Last updated: January 2025</p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-12">
            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                  Acceptance of Terms
                </h2>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border-l-4 border-red-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  By accessing and using Nano Banana&apos;s AI image generation service, you agree to be bound 
                  by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  Service Description
                </h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border-l-4 border-orange-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Nano Banana provides an AI-powered image generation service that allows users to create 
                  artwork from text descriptions. Our service includes:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Text-to-image generation using advanced AI models</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Multiple artistic styles and customization options</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">High-quality image output in various formats</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">User-friendly interface and tools</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Customer support and assistance</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  User Responsibilities
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  As a user of our service, you agree to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Provide accurate and appropriate text prompts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Respect intellectual property rights and copyright laws</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Not use the service for illegal or harmful purposes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Not attempt to reverse engineer or hack our systems</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Comply with all applicable laws and regulations</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  Content Guidelines
                </h2>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-l-4 border-amber-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  You may not use our service to generate content that:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Contains hate speech, violence, or discrimination</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Infringes on intellectual property rights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Is sexually explicit or inappropriate</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Promotes illegal activities or harmful behavior</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Contains personal information of others without consent</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Is intended to deceive or mislead</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                  Intellectual Property
                </h2>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-l-4 border-cyan-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Regarding the images you generate using our service:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">You retain ownership of the generated images</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">You may use the images for personal and commercial purposes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">We retain the right to use generated images for service improvement</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700">You are responsible for ensuring you have rights to use any referenced content</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
                  Service Availability
                </h2>
              </div>
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 border-l-4 border-violet-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  We strive to maintain high service availability but cannot guarantee:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">100% uptime or continuous availability</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">Immediate response times during peak usage</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">Compatibility with all devices or browsers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">Unlimited usage without restrictions</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  7
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
                  Limitation of Liability
                </h2>
              </div>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border-l-4 border-rose-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Nano Banana shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising from your use of our service.
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  8
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  Changes to Terms
                </h2>
              </div>
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border-l-4 border-sky-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of 
                  significant changes via email or through our service. Continued use after changes 
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  9
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                  Contact Information
                </h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border-l-4 border-emerald-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-lg">📞</span>
                    </div>
                    <p className="text-emerald-800 font-semibold text-lg">Email: legal@nanobananamodle.com</p>
                  </div>
                  <p className="text-emerald-600 text-sm">
                    We will respond to your inquiry within 24 hours.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
