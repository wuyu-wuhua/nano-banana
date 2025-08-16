"use client"

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/auth-context';
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
import { Button } from './ui/button';
import Link from 'next/link';

interface DrawPageProps {}

const DrawPage: React.FC<DrawPageProps> = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState<'1:1' | '3:4' | '4:3' | '16:9' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 文生图尺寸映射 - 修正为后端API期望的格式
  const text2imgSizeMap = {
    '1:1': '1024*1024',
    '3:4': '768*1152',
    '4:3': '1280*720',
    '16:9': '1280*720',
    '9:16': '720*1280',
  };

  // UI显示用的尺寸映射
  const uiSizeMap = {
    '1:1': { w: 512, h: 512 },
    '3:4': { w: 480, h: 640 },
    '4:3': { w: 640, h: 480 },
    '16:9': { w: 640, h: 360 },
    '9:16': { w: 360, h: 640 },
  };

  const handleGenerate = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratingProgress(0);
    setError(null);
    setSuccess(null);
    
    try {
      setGeneratingProgress(10);
      
      // 调用文生图API - 使用DashScope，传递正确的尺寸格式
      const response = await fetch('/api/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: style === 'realistic' ? '<photography>' : 
                 style === 'anime' ? '<anime>' :
                 style === 'oil_painting' ? '<oil painting>' :
                 style === 'watercolor' ? '<watercolor>' :
                 style === 'sketch' ? '<sketch>' : '<auto>',
          size: text2imgSizeMap[size] // 使用映射后的正确尺寸格式
        }),
      });
      
      setGeneratingProgress(30);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('draw.errorMessage'));
      }
      
      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratingProgress(100);
        setGeneratedImage(data.imageUrl);
        setSuccess(t('draw.successMessage'));
      } else {
        throw new Error(t('draw.errorMessage'));
      }
      
    } catch (error) {
      console.error(t('draw.generationFailed'), error);
      setError(error instanceof Error ? error.message : t('draw.errorMessage'));
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

      {/* 登录提示弹框 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              请先登录
            </h3>
            <p className="text-gray-600 mb-6">
              登录后才能使用AI图片生成功能
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setShowLoginModal(false)}
                variant="outline"
                size="lg"
              >
                取消
              </Button>
              <Link href="/auth/sign-in">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white">
                  去登录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{t('draw.title')}</h2>
          <p className="text-gray-600 text-lg">{t('draw.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧控制区域 */}
          <div className="space-y-6">
            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">{t('draw.errorMessage')}</p>
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
                  <p className="text-green-800 font-medium">{t('draw.success')}</p>
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
                    <h3 className="text-xl font-semibold text-gray-900">{t('draw.describeYourIdea')}</h3>
                    <p className="text-gray-600 text-sm">{t('draw.describeYourIdeaDesc')}</p>
                  </div>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t('draw.promptPlaceholder')}
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
                    <h4 className="text-lg font-semibold text-gray-900">{t('draw.styleLabel')}</h4>
                  </div>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  >
                    <option value="realistic">{t('draw.styleRealistic')}</option>
                    <option value="anime">{t('draw.styleAnime')}</option>
                    <option value="oil_painting">{t('draw.styleOilPainting')}</option>
                    <option value="watercolor">{t('draw.styleWatercolor')}</option>
                    <option value="sketch">{t('draw.styleSketch')}</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">📐</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{t('draw.sizeLabel')}</h4>
                  </div>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as '1:1' | '3:4' | '4:3' | '16:9' | '9:16')}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg"
                  >
                    <option value="1:1">{t('draw.sizeSquare')} (1024×1024)</option>
                    <option value="3:4">{t('draw.sizePortrait')} (768×1152)</option>
                    <option value="4:3">{t('draw.sizeLandscape')} (1280×720)</option>
                    <option value="16:9">{t('draw.sizeWidescreen')} (1280×720)</option>
                    <option value="9:16">{t('draw.sizeMobilePortrait')} (720×1280)</option>
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
                        <span>{t('draw.generating')}</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-6 h-6" />
                        <span>{t('draw.generateButton')}</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  💡 {t('draw.tip')}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧预览区域 */}
          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">{t('draw.result')}</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center relative overflow-hidden"
                style={{
                  minHeight: `${uiSizeMap[size]?.h || 512}px`,
                  aspectRatio: `${uiSizeMap[size]?.w || 512} / ${uiSizeMap[size]?.h || 512}`
                }}
              >
                {generatedImage ? (
                  <>
                    <img
                      src={generatedImage}
                      alt={t('draw.generatedImage')}
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
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">{t('draw.generating')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${generatingProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{generatingProgress}%</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium">{t('draw.waitingForGeneration')}</p>
                    <p className="text-sm">{t('draw.enterPromptAndClick')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingSupport />
    </div>
  );
};

export default DrawPage;
