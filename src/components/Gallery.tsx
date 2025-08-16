"use client"

import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t } = useLanguage();

  const sampleImages = [
    {
      id: 1,
      url: '/images/神秘森林.png',
      titleKey: 'gallery.image1.title',
      descKey: 'gallery.image1.desc',
      promptKey: 'gallery.prompt1'
    },
    {
      id: 2,
      url: '/images/未来城市景观.png',
      titleKey: 'gallery.image2.title',
      descKey: 'gallery.image2.desc',
      promptKey: 'gallery.prompt2'
    },
    {
      id: 3,
      url: '/images/海上日落.png',
      titleKey: 'gallery.image3.title',
      descKey: 'gallery.image3.desc',
      promptKey: 'gallery.prompt3'
    },
    {
      id: 4,
      url: '/images/山景.png',
      titleKey: 'gallery.image4.title',
      descKey: 'gallery.image4.desc',
      promptKey: 'gallery.prompt4'
    },
    {
      id: 5,
      url: '/images/太空银河.png',
      titleKey: 'gallery.image5.title',
      descKey: 'gallery.image5.desc',
      promptKey: 'gallery.prompt5'
    },
    {
      id: 6,
      url: '/images/抽象艺术.png',
      titleKey: 'gallery.image6.title',
      descKey: 'gallery.image6.desc',
      promptKey: 'gallery.prompt6'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      titleKey: 'gallery.image7.title',
      descKey: 'gallery.image7.desc',
      promptKey: 'gallery.prompt7'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600',
      titleKey: 'gallery.image8.title',
      descKey: 'gallery.image8.desc',
      promptKey: 'gallery.prompt8'
    },
    {
      id: 9,
      url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=600',
      titleKey: 'gallery.image9.title',
      descKey: 'gallery.image9.desc',
      promptKey: 'gallery.prompt9'
    }
  ];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('gallery.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sampleImages.map((image) => (
            <div key={image.id} className="group relative bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={image.url} 
                  alt={t(image.titleKey)}
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Actions */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  </button>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {t(image.titleKey)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {t(image.descKey)}
                </p>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">{t('gallery.prompt')}</p>
                  <p className="text-xs sm:text-sm text-gray-700 italic">&ldquo;{t(image.promptKey)}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a 
            href="/gallery"
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-block text-sm sm:text-base"
          >
            {t('gallery.loadMore')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;