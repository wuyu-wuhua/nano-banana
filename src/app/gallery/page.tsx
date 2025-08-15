import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';

export default function GalleryPage() {
  const galleryImages = [
    {
      id: 1,
      title: '抽象艺术',
      description: '充满想象力的抽象艺术作品',
      url: '/images/抽象艺术.png',
      category: '抽象'
    },
    {
      id: 2,
      title: '未来城市',
      description: '科技感十足的未来都市景观',
      url: '/images/未来城市.png',
      category: '科幻'
    },
    {
      id: 3,
      title: '太空探索',
      description: '浩瀚宇宙中的探索之旅',
      url: '/images/太空.png',
      category: '太空'
    },
    {
      id: 4,
      title: '自然风光',
      description: '大自然的美丽与和谐',
      url: '/images/自然风光.png',
      category: '自然'
    },
    {
      id: 5,
      title: '人物肖像',
      description: '生动的人物形象刻画',
      url: '/images/人物肖像.png',
      category: '人物'
    },
    {
      id: 6,
      title: '动物世界',
      description: '可爱的动物们',
      url: '/images/动物世界.png',
      category: '动物'
    },
    {
      id: 7,
      title: '建筑艺术',
      description: '独特的建筑设计',
      url: '/images/建筑艺术.png',
      category: '建筑'
    },
    {
      id: 8,
      title: '梦幻场景',
      description: '超现实的梦幻世界',
      url: '/images/梦幻场景.png',
      category: '梦幻'
    },
    {
      id: 9,
      title: '科技未来',
      description: '前沿科技概念',
      url: '/images/科技未来.png',
      category: '科技'
    },
    {
      id: 10,
      title: '艺术风格',
      description: '独特的艺术表现',
      url: '/images/艺术风格.png',
      category: '艺术'
    },
    {
      id: 11,
      title: '创意设计',
      description: '富有创意的设计作品',
      url: '/images/创意设计.png',
      category: '创意'
    },
    {
      id: 12,
      title: '数字艺术',
      description: '数字时代的艺术表达',
      url: '/images/数字艺术.png',
      category: '数字'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            创作画廊
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            探索我们社区运用 Nano Banana 的AI技术创作的精美艺术作品。获取灵感，用 Nano Banana 创作属于你自己的杰作。
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 text-lg font-medium">{image.title}</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <span className="text-gray-800 text-lg">👁️</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{image.title}</h3>
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-green-500 text-white text-xs rounded-full">
                    {image.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            加载更多作品
          </button>
        </div>

        {/* Gallery Stats */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">画廊统计</h2>
            <p className="text-gray-600">我们的创作社区正在不断壮大</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">1000+</div>
              <div className="text-gray-600">艺术作品</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">创作者</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">艺术风格</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">创作时间</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-green-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">开始你的创作之旅</h3>
            <p className="text-xl mb-8 opacity-90">
              使用 Nano Banana 的AI技术，将你的创意想法转化为精美的艺术作品
            </p>
            <a 
              href="/draw" 
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-block"
            >
              立即开始创作
            </a>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />
    </div>
  );
}
