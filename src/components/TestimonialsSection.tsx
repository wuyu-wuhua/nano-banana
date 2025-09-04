"use client"

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const testimonials = [
    {
      id: 1,
      nameKey: 'testimonials.user1.name',
      roleKey: 'testimonials.user1.role',
      textKey: 'testimonials.user1.text',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      id: 2,
      nameKey: 'testimonials.user2.name',
      roleKey: 'testimonials.user2.role',
      textKey: 'testimonials.user2.text',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      id: 3,
      nameKey: 'testimonials.user3.name',
      roleKey: 'testimonials.user3.role',
      textKey: 'testimonials.user3.text',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      id: 4,
      nameKey: 'testimonials.user4.name',
      roleKey: 'testimonials.user4.role',
      textKey: 'testimonials.user4.text',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      id: 5,
      nameKey: 'testimonials.user5.name',
      roleKey: 'testimonials.user5.role',
      textKey: 'testimonials.user5.text',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    },
    {
      id: 6,
      nameKey: 'testimonials.user6.name',
      roleKey: 'testimonials.user6.role',
      textKey: 'testimonials.user6.text',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
              {/* Quote Icon */}
              <div className="absolute top-3 sm:top-6 right-3 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2 sm:mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-xs sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-6 relative z-10">
                &ldquo;{t(testimonial.textKey)}&rdquo;
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={t(testimonial.nameKey)}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs sm:text-base">
                    {t(testimonial.nameKey)}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t(testimonial.roleKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-yellow-600 mb-1 sm:mb-2">4.9</div>
              <div className="flex items-center justify-center space-x-1 mb-1 sm:mb-2">
                {renderStars(5)}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('testimonials.stats.averageRating')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-1 sm:mb-2">50K+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('testimonials.stats.happyUsers')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">1M+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('testimonials.stats.imagesGenerated')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">98%</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('testimonials.stats.satisfactionRate')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;