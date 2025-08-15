import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full px-6 py-3 mb-6">
              <span className="text-lg">🔒</span>
              <span className="font-semibold">Privacy & Security</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">Last updated: January 2025</p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-green-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-12">
            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Information We Collect
                </h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our AI image generation service, or contact us for support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Account information (email, username)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Usage data and generated images</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Communication preferences</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Technical information about your device and usage</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  How We Use Your Information
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-l-4 border-green-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Process and generate AI images based on your prompts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Provide customer support and respond to inquiries</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Improve our AI models and service quality</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Send important updates and service notifications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Ensure security and prevent fraud</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  Data Security
                </h2>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-l-4 border-yellow-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Encryption of data in transit and at rest</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Regular security audits and updates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Access controls and authentication measures</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Secure data centers and infrastructure</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Data Sharing
                </h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share information only in the following circumstances:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">With your explicit consent</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">To comply with legal obligations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">To protect our rights and safety</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">With trusted service providers who assist in our operations</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  5
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  Your Rights
                </h2>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border-l-4 border-indigo-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  You have the right to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">Access and review your personal information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">Update or correct inaccurate information</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">Request deletion of your data</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">Opt-out of marketing communications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-700">Export your data in a portable format</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  6
                </div>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                  Contact Us
                </h2>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-8 border-l-4 border-teal-500">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 text-lg">📧</span>
                    </div>
                    <p className="text-teal-800 font-semibold text-lg">Email: privacy@nanobananamodle.com</p>
                  </div>
                  <p className="text-teal-600 text-sm">
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
