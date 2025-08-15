"use client"

import React, { useState } from 'react';
import { 
  Download, 
  Heart, 
  X, 
  RefreshCw,
  Wand2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import FloatingSupport from './FloatingSupport';

interface DrawPageProps {}

const DrawPage: React.FC<DrawPageProps> = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState<'1:1' | '3:4' | '4:3' | '16:9' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 文生图尺寸映射
  const text2imgSizeMap = {
    '1:1': { w: 512, h: 512 },
    '3:4': { w: 480, h: 640 },
    '4:3': { w: 640, h: 480 },
    '16:9': { w: 640, h: 360 },
    '9:16': { w: 360, h: 640 },
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratingProgress(0);
    setError(null);
    setSuccess(null);
    
    try {
      setGeneratingProgress(10);
      
      // 调用文生图API
      const response = await fetch('/api/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style,
          size
        }),
      });
      
      setGeneratingProgress(90);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成失败');
      }
      
      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratingProgress(100);
        setGeneratedImage(data.imageUrl);
        setSuccess('图片生成成功！');
      } else {
        throw new Error('生成失败');
      }
      
    } catch (error) {
      console.error('生成失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };





  const handleDownloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `nano-banana-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleClearImage = () => {
    setGeneratedImage(null);
    setIsFavorited(false);
  };

  const handleNewDraw = () => {
    setPrompt('');
    setStyle('realistic');
    setSize('1:1');
    setGeneratedImage(null);
    setIsFavorited(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">AI 文生图</h2>
          <p className="text-gray-600 text-lg">用文字描述你的创意，AI为你生成独特的艺术作品</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧控制区域 */}
          <div className="space-y-6">


            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">生成失败</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 成功提示 */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-green-800 font-medium">成功</p>
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
                <button
                  onClick={() => setSuccess(null)}
                  className="text-green-400 hover:text-green-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 文生图面板 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-8">
              {/* 提示词输入区域 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">描述你的创意</h3>
                    <p className="text-gray-600 text-sm">详细描述你想要生成的图片内容</p>
                  </div>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：一只可爱的小猫坐在花园里，阳光明媚，花朵盛开，画面温暖明亮..."
                  className="w-full h-36 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 text-lg leading-relaxed"
                />
              </div>

              {/* 设置选项区域 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">🎨</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">艺术风格</h4>
                  </div>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    <option value="realistic">🎭 写实风格 - 逼真的照片效果</option>
                    <option value="anime">🎌 动漫风格 - 日式动漫风格</option>
                    <option value="oil-painting">🖼️ 油画风格 - 古典油画艺术</option>
                    <option value="watercolor">💧 水彩风格 - 柔和的水彩画</option>
                    <option value="sketch">✏️ 素描风格 - 黑白素描艺术</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">📐</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">输出尺寸</h4>
                  </div>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as '1:1' | '3:4' | '4:3' | '16:9' | '9:16')}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                  >
                    <option value="1:1">⬜ 1:1 正方形 (1024×1024)</option>
                    <option value="3:4">📱 3:4 竖版 (768×1152)</option>
                    <option value="4:3">🖥️ 4:3 横版 (1280×720)</option>
                    <option value="16:9">🎬 16:9 宽屏 (1280×720)</option>
                    <option value="9:16">📱 9:16 手机竖版 (720×1280)</option>
                  </select>
                </div>
              </div>

              {/* 生成按钮 */}
              <div className="pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-white py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>AI正在创作中...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-6 h-6" />
                        <span>开始AI创作</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  💡 提示：描述越详细，生成的图片越符合你的想象
                </p>
              </div>
            </div>


          </div>

          {/* 右侧预览区域 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">生成结果</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                              <div
                  className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center relative overflow-hidden"
                  style={{
                    minHeight: `${text2imgSizeMap[size]?.h || 512}px`,
                    aspectRatio: `${text2imgSizeMap[size]?.w || 512} / ${text2imgSizeMap[size]?.h || 512}`
                  }}
                >
                {generatedImage ? (
                  <>
                    <img
                      src={generatedImage}
                      alt="生成的图片"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={handleClearImage}
                        className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={handleToggleFavorite}
                        className={`rounded-full p-2 shadow-lg transition-colors ${
                          isFavorited
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={handleDownloadImage}
                        className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </>
                                 ) : isGenerating ? (
                   <div className="text-center space-y-6">
                     <div className="relative">
                       <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 mx-auto"></div>
                       <div className="absolute inset-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-yellow-500 border-r-green-500 mx-auto"></div>
                     </div>
                     <div className="space-y-3">
                       <p className="text-gray-700 font-semibold text-lg">AI正在创作中...</p>
                       <p className="text-gray-500 text-sm">请耐心等待，这可能需要几分钟</p>
                       <div className="w-80 bg-gray-200 rounded-full h-3 mx-auto">
                         <div
                           className="bg-gradient-to-r from-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                           style={{ width: `${generatingProgress}%` }}
                         ></div>
                       </div>
                       <p className="text-sm text-gray-500 font-medium">{generatingProgress}%</p>
                     </div>
                   </div>
                                 ) : (
                   <div className="text-center space-y-6">
                     <div className="relative">
                       <Wand2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-green-200 rounded-full blur-2xl opacity-30"></div>
                     </div>
                     <div className="space-y-2">
                       <p className="text-gray-600 font-medium text-lg">准备开始创作</p>
                       <p className="text-gray-500 text-sm">选择左侧的创作模式，输入你的想法</p>
                       <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                         <span>✨</span>
                         <span>AI将为你生成独特的艺术作品</span>
                         <span>✨</span>
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingSupport />
      <Footer />

    </div>
  );
};

export default DrawPage;
