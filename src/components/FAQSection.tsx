"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does Nano Banana work?',
      answer: 'Nano Banana uses advanced AI models to interpret your text descriptions and generate corresponding images. Simply type what you want to see, select your preferred style, and our AI will create a unique artwork in seconds.'
    },
    {
      question: 'What kind of images can I generate?',
      answer: 'You can generate virtually any type of image - from realistic photographs to abstract art, cartoons, landscapes, portraits, fantasy scenes, and more. Our AI supports over 150 different artistic styles and can handle complex, detailed prompts.'
    },
    {
      question: 'Is there a limit to how many images I can create?',
      answer: 'Free users can generate up to 10 images per day. Premium subscribers get unlimited generations, priority processing, and access to advanced features like higher resolutions and exclusive art styles.'
    },
    {
      question: 'What resolution are the generated images?',
      answer: 'Free users receive images at 1024x1024 pixels. Premium users can generate images up to 4K resolution (4096x4096 pixels), perfect for printing and professional use.'
    },
    {
      question: 'Can I use the generated images commercially?',
      answer: 'Yes! All images generated with Nano Banana can be used for commercial purposes. You retain full rights to your creations, including the ability to sell, modify, and distribute them as you wish.'
    },
    {
      question: 'How long does it take to generate an image?',
      answer: 'Most images are generated within 15-30 seconds. Premium users enjoy priority processing, which can reduce generation time to as little as 10 seconds during peak hours.'
    },
    {
      question: 'What makes Nano Banana different from other AI generators?',
      answer: 'Nano Banana focuses on quality, speed, and user experience. We use the latest AI models, offer more artistic styles than competitors, provide better prompt understanding, and maintain the highest image quality standards in the industry.'
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely. We take privacy seriously. Your prompts and generated images are encrypted and never shared with third parties. You can delete your account and all associated data at any time.'
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Got questions? We&apos;ve got answers. Here are the most common questions 
            about Nano Banana and how Nano Banana AI image generation works.
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
                  {faq.question}
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
                      {faq.answer}
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
            Still have questions? We&apos;re here to help!
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;