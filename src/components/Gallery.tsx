"use client"

import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

const Gallery: React.FC = () => {

  const sampleImages = [
    {
      id: 1,
      url: '/images/神秘森林.png',
      title: 'Mystical Forest',
      description: 'A magical forest with glowing mushrooms and ethereal light',
      prompt: 'magical forest with glowing mushrooms, ethereal lighting, fantasy art'
    },
    {
      id: 2,
      url: '/images/未来城市景观.png',
      title: 'Futuristic Cityscape',
      description: 'A cyberpunk city with neon lights and flying cars',
      prompt: 'cyberpunk city, neon lights, flying cars, futuristic architecture'
    },
    {
      id: 3,
      url: '/images/海上日落.png',
      title: 'Ocean Sunset',
      description: 'A serene ocean scene with vibrant sunset colors',
      prompt: 'ocean sunset, vibrant colors, peaceful waves, golden hour'
    },
    {
      id: 4,
      url: '/images/山景.png',
      title: 'Mountain Landscape',
      description: 'Majestic mountains with dramatic clouds and lighting',
      prompt: 'majestic mountains, dramatic clouds, epic landscape photography'
    },
    {
      id: 5,
      url: '/images/太空银河.png',
      title: 'Space Galaxy',
      description: 'A stunning view of distant galaxies and nebulae',
      prompt: 'distant galaxies, colorful nebulae, space photography, stars'
    },
    {
      id: 6,
      url: '/images/抽象艺术.png',
      title: 'Abstract Art',
      description: 'Vibrant abstract composition with flowing colors',
      prompt: 'abstract art, vibrant colors, flowing patterns, digital painting'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Wildlife Portrait',
      description: 'A detailed portrait of a majestic wildlife creature',
      prompt: 'wildlife portrait, detailed fur, natural habitat, professional photography'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Architectural Wonder',
      description: 'Modern architecture with unique geometric patterns',
      prompt: 'modern architecture, geometric patterns, glass and steel, urban design'
    },
    {
      id: 9,
      url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: 'Vintage Car',
      description: 'Classic vintage car in a nostalgic setting',
      prompt: 'vintage car, classic design, nostalgic atmosphere, retro photography'
    }
  ];



  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gallery of Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore stunning artworks created by our community using Nano Banana&apos;s AI technology. 
            Get inspired and create your own masterpieces with Nano Banana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleImages.map((image) => (
            <div key={image.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Actions */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <ExternalLink className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {image.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Prompt:</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{image.prompt}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/gallery"
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
          >
            加载更多作品
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;