"use client"

import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/auth-context';
import { 
  Download, 
  Heart, 
  X, 
  RefreshCw,
  Wand2,
  AlertCircle,
  CheckCircle,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import FloatingSupport from './FloatingSupport';
import { Button } from './ui/button';
import Link from 'next/link';
import { supabase } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';

interface DrawPageProps {}

const DrawPage: React.FC<DrawPageProps> = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showInsufficientCreditsModal, setShowInsufficientCreditsModal] = useState(false);
  const [insufficientCreditsError, setInsufficientCreditsError] = useState<string>('');
  const [showGalleryMessage, setShowGalleryMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // 自动将生成的图片添加到画廊
  const addToGallery = async (imageUrl: string, showInGallery: boolean = false) => {
    if (!user) return;
    
    try {
      console.log('开始将图片添加到画廊:', imageUrl, '是否展示:', showInGallery);
      
      // 首先检查数据库中是否已经存在相同的图片（基于prompt，而不是URL）
      const { data: existingImage, error: checkError } = await supabase
        .from('nano_user_images')
        .select('id, image_url, storage_path, is_public')
        .eq('user_id', user.id)
        .eq('prompt', 'Create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork')
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 表示没有找到记录
        console.error('检查重复图片失败:', checkError);
        return;
      }

      // 如果图片已经存在，直接更新展示状态
      if (existingImage) {
        console.log('图片已存在于画廊中，更新展示状态');
        
        // 如果图片当前不是公开状态，则设为公开
        if (!existingImage.is_public) {
          const { error: updateError } = await supabase
            .from('nano_user_images')
            .update({ 
              is_public: true,
              is_favorited: true 
            })
            .eq('id', existingImage.id);

          if (!updateError) {
            console.log('展示状态更新成功');
            setShowGalleryMessage(t('draw.addedToGallery'));
            setTimeout(() => setShowGalleryMessage(null), 3000);
            
            // 触发自定义事件，通知Gallery组件刷新
            window.dispatchEvent(new CustomEvent('galleryImageAdded', {
              detail: { userId: user.id }
            }));
          } else {
            console.error('更新展示状态失败:', updateError);
          }
        } else {
          // 如果已经是公开状态，只更新收藏状态
          const { error: updateError } = await supabase
            .from('nano_user_images')
            .update({ is_favorited: true })
            .eq('id', existingImage.id);

          if (!updateError) {
            console.log('收藏状态更新成功');
            setShowGalleryMessage(t('draw.addedToGallery'));
            setTimeout(() => setShowGalleryMessage(null), 3000);
            
            // 触发自定义事件，通知Gallery组件刷新
            window.dispatchEvent(new CustomEvent('galleryImageAdded', {
              detail: { userId: user.id }
            }));
          } else {
            console.error('更新收藏状态失败:', updateError);
          }
        }
        return;
      }

      // 如果图片不存在，则上传新图片到storage（图片生成后自动上传）
      const imageName = `gallery/${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
      
      // 从URL获取图片数据
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      console.log('图片数据获取成功，开始上传到存储桶');
      
      // 上传到存储桶
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('nano-banana')
        .upload(imageName, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('上传到存储桶失败:', uploadError);
        return;
      }

      console.log('图片上传到存储桶成功:', uploadData);

      // 获取公共URL
      const { data: publicUrlData } = supabase.storage
        .from('nano-banana')
        .getPublicUrl(imageName);

      console.log('获取公共URL成功:', publicUrlData.publicUrl);

      // 将图片信息存储到数据库（根据用户选择决定是否公开）
      const { error: dbError } = await supabase
        .from('nano_user_images')
        .insert({
          user_id: user.id,
          image_url: imageUrl, // 使用原始URL，不是storage的URL
          storage_path: imageName,
          prompt: 'Create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork',
          style: 'image_to_figurine',
          size: 'auto',
          is_public: showInGallery, // 根据用户选择决定是否公开
          is_favorited: showInGallery, // 如果展示则自动收藏
          created_at: new Date().toISOString()
        });

      if (!dbError) {
        if (showInGallery) {
          console.log('图片信息保存到数据库成功，已展示到画廊');
          setShowGalleryMessage(t('draw.addedToGallery'));
          setTimeout(() => setShowGalleryMessage(null), 3000);
          
          // 触发自定义事件，通知Gallery组件刷新
          window.dispatchEvent(new CustomEvent('galleryImageAdded', {
            detail: { userId: user.id }
          }));
        } else {
          console.log('图片信息保存到数据库成功（未展示到画廊）');
          setShowGalleryMessage(t('draw.imageSaved'));
          setTimeout(() => setShowGalleryMessage(null), 3000);
        }
      } else {
        console.error('保存到数据库失败:', dbError);
      }
    } catch (error) {
      console.error('添加到画廊失败:', error);
    }
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        setError(t('draw.invalidFileType'));
        return;
      }
      
      // 检查文件大小 (限制为10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(t('draw.fileTooLarge'));
        return;
      }
      
      setUploadedFile(file);
      
      // 创建预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setError(null);
    }
  };

  // 清除上传的图片
  const handleClearUploadedImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!user) {
      // 未登录：先弹出登录提示弹窗，由用户确认后再跳转
      setShowLoginModal(true);
      return;
    }

    if (!uploadedImage || !uploadedFile) {
      setError(t('draw.imageRequired'));
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImage(null);
    setShowGalleryMessage(null);
    
    try {
      setGeneratingProgress(10);
      
      // 先检查并消耗用户积分
      const consumeResponse = await fetch('/api/credits/consume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10,
          description: 'AI图片生成',
          metadata: {
            prompt: 'Create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork',
            style: 'image_to_figurine',
            size: 'auto'
          }
        }),
      });
      
      if (!consumeResponse.ok) {
        const consumeError = await consumeResponse.json();
        if (consumeError.error === 'insufficient_credits') {
          setInsufficientCreditsError(consumeError.message || t('draw.insufficientCredits'));
          setShowInsufficientCreditsModal(true);
          setIsGenerating(false);
          return;
        }
        throw new Error(consumeError.error || t('draw.creditConsumeError'));
      }
      
      const consumeData = await consumeResponse.json();
      console.log('积分消耗成功:', consumeData);
      
      setGeneratingProgress(20);
      
      // 准备API调用参数 - 图生图
      const apiParams = {
        prompt: 'Create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork',
        image: uploadedImage // 添加上传的图片
      };
      
      console.log('API调用参数:', apiParams);
      
      // 调用图生图API
      const response = await fetch('/api/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiParams),
      });
      
      setGeneratingProgress(50);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('draw.errorMessage'));
      }
      
      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setGeneratingProgress(100);
        setGeneratedImage(data.imageUrl);
        setIsFavorited(false); // 不自动设置为已收藏状态
        // 移除自动添加到画廊：addToGallery(data.imageUrl);
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

  // 处理爱心按钮点击 - 收藏/取消收藏
  const handleToggleFavorite = async () => {
    if (!user) {
      setShowGalleryMessage(t('draw.loginRequired'));
      setTimeout(() => setShowGalleryMessage(null), 3000);
      return;
    }

    if (!generatedImage) return;

    try {
      if (isFavorited) {
        // 取消收藏 - 从数据库中删除
        const { error: deleteError } = await supabase
          .from('nano_user_images')
          .delete()
          .eq('user_id', user.id)
          .eq('image_url', generatedImage);

        if (!deleteError) {
          setIsFavorited(false);
          setShowGalleryMessage(t('draw.removedFromGallery'));
          setTimeout(() => setShowGalleryMessage(null), 3000);
        }
      } else {
        // 添加到收藏 - 添加到画廊
        await addToGallery(generatedImage, true); // 默认展示到画廊
        setIsFavorited(true);
        setShowGalleryMessage(t('draw.addedToGallery'));
        setTimeout(() => setShowGalleryMessage(null), 3000);
      }
    } catch (error) {
      console.error('操作失败:', error);
      setShowGalleryMessage(t('draw.operationFailed'));
      setTimeout(() => setShowGalleryMessage(null), 3000);
    }
  };

  const handleClearImage = () => {
    setGeneratedImage(null);
    setIsFavorited(false);
  };

  const handleNewDraw = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage(null);
    setIsFavorited(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              {t('draw.loginRequired')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('draw.loginRequiredDesc')}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setShowLoginModal(false)}
                variant="outline"
                size="lg"
              >
                {t('draw.cancel')}
              </Button>
              <Link href="/auth/sign-in?redirect=/draw">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white">
                  {t('draw.goToLogin')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 积分不足提示弹框 */}
      {showInsufficientCreditsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('draw.insufficientCredits')}
            </h3>
            <p className="text-gray-600 mb-6">
              {insufficientCreditsError}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setShowInsufficientCreditsModal(false)}
                variant="outline"
                size="lg"
              >
                {t('draw.cancel')}
              </Button>
              <Link href="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white">
                  {t('profile.purchaseCredits')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 画廊消息提示 */}
      {showGalleryMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {showGalleryMessage}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pt-20 sm:pt-24">
        {/* 页面标题 - 移动端优化 */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{t('draw.title')}</h2>
          <p className="text-gray-600 text-sm sm:text-lg hidden sm:block">{t('draw.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 max-w-full">
          {/* 左侧控制区域 */}
          <div className="space-y-4 sm:space-y-6 w-full max-w-full">
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


            {/* 图生图面板 */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{t('draw.uploadImage')}</h3>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-6 w-full">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center relative overflow-hidden w-full"
                  style={{
                    minHeight: '300px',
                    aspectRatio: '1 / 1',
                    maxHeight: '400px',
                    width: '100%'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {uploadedImage ? (
                    <>
                      <img
                        src={uploadedImage}
                        alt="Uploaded image"
                        className="w-full h-full object-contain rounded-xl"
                      />
                      <button
                        onClick={handleClearUploadedImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-200 w-full h-full p-4"
                    >
                      <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-3" />
                      <p className="text-gray-600 font-medium text-sm sm:text-base text-center">{t('draw.clickToUpload')}</p>
                      <p className="text-gray-400 text-xs sm:text-sm text-center">{t('draw.supportedFormats')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 生成按钮 */}
              <div className="pt-3 sm:pt-4">
                <button
                  onClick={handleGenerate}
                  disabled={!uploadedImage || isGenerating}
                  className="w-full bg-gradient-to-r from-yellow-500 to-green-500 text-white py-3 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent"></div>
                        <span className="text-sm sm:text-base">{t('draw.generating')}</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base">{t('draw.generateButton')}</span>
                        <span className="text-xs sm:text-sm opacity-80">({t('draw.costCredits').replace('{credits}', '10')})</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <p className="text-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3">
                  💡 {t('draw.uploadTip')}
                </p>
              </div>
            </div>
          </div>

          {/* 右侧预览区域 */}
          <div className="space-y-3 sm:space-y-4 w-full max-w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{t('draw.result')}</h3>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-6 w-full">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center relative overflow-hidden w-full"
                style={{
                  minHeight: '300px',
                  aspectRatio: '1 / 1',
                  maxHeight: '400px',
                  width: '100%'
                }}
              >
                {generatedImage ? (
                  <>
                    <img
                      src={generatedImage}
                      alt={t('draw.generatedImage')}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    
                    {/* 提示信息 */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <div className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {isFavorited ? t('draw.removeFromGalleryHint') : t('draw.addToGalleryHint')}
                      </div>
                    </div>
                    
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
                      <button
                        onClick={handleClearImage}
                        className="bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center size-6 sm:size-8"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={handleToggleFavorite}
                        className={`rounded-full p-1 sm:p-1.5 shadow-lg transition-colors ${
                          isFavorited
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                        title={isFavorited ? t('draw.alreadyInGallery') : t('draw.addToGallery')}
                      >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={handleDownloadImage}
                        className="bg-white rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                    </div>
                  </>
                ) : isGenerating ? (
                  <div className="text-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-yellow-500 border-t-transparent mx-auto mb-2 sm:mb-3"></div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm">{t('draw.generating')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: `${generatingProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 sm:mt-2">{generatingProgress}%</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 p-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium">{t('draw.waitingForGeneration')}</p>
                    <p className="text-xs sm:text-sm">{t('draw.enterPromptAndClick')}</p>
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
