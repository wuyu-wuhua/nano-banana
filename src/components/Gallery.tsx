"use client"

import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, CheckCircle, X, ZoomIn, Copy, Check, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/auth-context';
import { supabase } from '../lib/supabase/client';
import { ImageModal } from './ImageModal';

interface GalleryImage {
  id: number;
  url: string;
  titleKey: string;
  descKey: string;
  promptKey: string;
  isUserGenerated?: boolean;
  userId?: string;
  prompt?: string;
  style?: string;
  size?: string;
  created_at?: string;
  storagePath?: string;
  isPublic?: boolean; // 新增isPublic属性
}

interface GalleryProps {
  isHomePage?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ isHomePage = false }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [userImages, setUserImages] = useState<GalleryImage[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [copiedImageId, setCopiedImageId] = useState<number | null>(null);

  // 示例图片
  const sampleImages: GalleryImage[] = [
    {
      id: 1,
      url: '/images/1.jpg',
      titleKey: 'gallery.image1.title',
      descKey: 'gallery.image1.desc',
      promptKey: 'gallery.prompt1'
    },
    {
      id: 2,
      url: '/images/2.jpg',
      titleKey: 'gallery.image2.title',
      descKey: 'gallery.image2.desc',
      promptKey: 'gallery.prompt2'
    },
    {
      id: 3,
      url: '/images/3.jpg',
      titleKey: 'gallery.image3.title',
      descKey: 'gallery.image3.desc',
      promptKey: 'gallery.prompt3'
    },
    {
      id: 4,
      url: '/images/4.jpg',
      titleKey: 'gallery.image4.title',
      descKey: 'gallery.image4.desc',
      promptKey: 'gallery.prompt4'
    },
    {
      id: 5,
      url: '/images/5.jpg',
      titleKey: 'gallery.image5.title',
      descKey: 'gallery.image5.desc',
      promptKey: 'gallery.prompt5'
    },
    {
      id: 6,
      url: '/images/6.jpg',
      titleKey: 'gallery.image6.title',
      descKey: 'gallery.image6.desc',
      promptKey: 'gallery.prompt6'
    },
    {
      id: 7,
      url: '/images/7.jpg',
      titleKey: 'gallery.image7.title',
      descKey: 'gallery.image7.desc',
      promptKey: 'gallery.prompt7'
    },
    {
      id: 8,
      url: '/images/8.jpg',
      titleKey: 'gallery.image8.title',
      descKey: 'gallery.image8.desc',
      promptKey: 'gallery.prompt8'
    },
    {
      id: 9,
      url: '/images/9.jpg',
      titleKey: 'gallery.image9.title',
      descKey: 'gallery.image9.desc',
      promptKey: 'gallery.prompt9'
    },
    {
      id: 10,
      url: '/images/10.jpg',
      titleKey: 'gallery.image10.title',
      descKey: 'gallery.image10.desc',
      promptKey: 'gallery.prompt10'
    },
    {
      id: 11,
      url: '/images/11.jpg',
      titleKey: 'gallery.image11.title',
      descKey: 'gallery.image11.desc',
      promptKey: 'gallery.prompt11'
    },
    {
      id: 12,
      url: '/images/12.jpg',
      titleKey: 'gallery.image12.title',
      descKey: 'gallery.image12.desc',
      promptKey: 'gallery.prompt12'
    },
    {
      id: 13,
      url: '/images/13.jpg',
      titleKey: 'gallery.image13.title',
      descKey: 'gallery.image13.desc',
      promptKey: 'gallery.prompt13'
    },
    {
      id: 14,
      url: '/images/14.jpg',
      titleKey: 'gallery.image14.title',
      descKey: 'gallery.image14.desc',
      promptKey: 'gallery.prompt14'
    },
    {
      id: 15,
      url: '/images/15.jpg',
      titleKey: 'gallery.image15.title',
      descKey: 'gallery.image15.desc',
      promptKey: 'gallery.prompt15'
    },
    {
      id: 16,
      url: '/images/16.jpg',
      titleKey: 'gallery.image16.title',
      descKey: 'gallery.image16.desc',
      promptKey: 'gallery.prompt16'
    },
    {
      id: 17,
      url: '/images/17.jpg',
      titleKey: 'gallery.image17.title',
      descKey: 'gallery.image17.desc',
      promptKey: 'gallery.prompt17'
    },
    {
      id: 18,
      url: '/images/18.jpg',
      titleKey: 'gallery.image18.title',
      descKey: 'gallery.image18.desc',
      promptKey: 'gallery.prompt18'
    },
    {
      id: 19,
      url: '/images/19.jpg',
      titleKey: 'gallery.image19.title',
      descKey: 'gallery.image19.desc',
      promptKey: 'gallery.prompt19'
    },
    {
      id: 20,
      url: '/images/20.jpg',
      titleKey: 'gallery.image20.title',
      descKey: 'gallery.image20.desc',
      promptKey: 'gallery.prompt20'
    },
    {
      id: 21,
      url: '/images/21.jpg',
      titleKey: 'gallery.image21.title',
      descKey: 'gallery.image21.desc',
      promptKey: 'gallery.prompt21'
    },
    {
      id: 22,
      url: '/images/22.jpg',
      titleKey: 'gallery.image22.title',
      descKey: 'gallery.image22.desc',
      promptKey: 'gallery.prompt22'
    },
    {
      id: 23,
      url: '/images/23.jpg',
      titleKey: 'gallery.image23.title',
      descKey: 'gallery.image23.desc',
      promptKey: 'gallery.prompt23'
    }
  ];

  // 获取所有用户生成的公开图片
  const fetchAllImages = async () => {
    try {
      console.log('开始获取所有公开图片...');
      
      const { data, error } = await supabase
        .from('nano_user_images')
        .select('id, image_url, prompt, style, size, created_at, user_id, storage_path, is_public')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('获取图片失败:', error);
        return;
      }

      console.log('获取到的原始数据:', data);
      console.log('获取到的图片数量:', data?.length || 0);

      if (data && data.length > 0) {
        // 去重：以 storage_path 优先，其次以 image_url 作为唯一键，保留最新的一条
        const seen = new Set<string>();
        const uniqueRows = [] as typeof data;
        for (const row of data) {
          const key = (row.storage_path as string | null) || (row.image_url as string);
          if (seen.has(key)) continue;
          seen.add(key);
          uniqueRows.push(row);
        }

        console.log('去重后的图片数量:', uniqueRows.length);

        const formattedImages: GalleryImage[] = uniqueRows.map((img) => ({
          id: img.id as number,
          url: img.image_url as string,
          titleKey: 'gallery.userGenerated.title',
          descKey: 'gallery.userGenerated.desc',
          promptKey: 'gallery.userGenerated.prompt',
          isUserGenerated: true,
          userId: img.user_id as string,
          prompt: (img as any).prompt as string | undefined,
          style: img.style as string | undefined,
          size: img.size as string | undefined,
          created_at: img.created_at as string,
          storagePath: (img.storage_path as string | null) || undefined,
          isPublic: img.is_public as boolean, // 添加isPublic属性
        }));
        
        console.log('格式化后的图片:', formattedImages);
        setUserImages(formattedImages);
      } else {
        console.log('没有找到公开的图片');
        setUserImages([]);
      }
    } catch (error) {
      console.error('获取图片失败:', error);
    }
  };

  // 获取公开图片（未登录也可见）
  useEffect(() => {
    console.log('Gallery useEffect 触发:', { isHomePage, user: user?.id });
    
    if (isHomePage) {
      setUserImages([]);
      return;
    }
    
    // 无论是否登录，都拉取公开图片
    fetchAllImages();

    const interval = setInterval(() => {
      fetchAllImages();
    }, 30000);

    return () => clearInterval(interval);
  }, [isHomePage]); // 移除user依赖，避免用户登录状态变化时重复调用

  // 监听图片添加事件，自动刷新画廊
  useEffect(() => {
    if (isHomePage) return;
    
    const handleGalleryImageAdded = (event: CustomEvent) => {
      if (event.detail.userId === user?.id) {
        setTimeout(() => {
          fetchAllImages();
        }, 1000);
      }
    };

    window.addEventListener('galleryImageAdded', handleGalleryImageAdded as EventListener);
    
    return () => {
      window.removeEventListener('galleryImageAdded', handleGalleryImageAdded as EventListener);
    };
  }, [user, isHomePage]);

  // 处理爱心按钮点击 - 收藏/取消收藏
  const handleHeartClick = async (image: GalleryImage) => {
    if (!user) {
      setShowSuccessMessage('请先登录');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    if (!image.isUserGenerated) {
      setShowSuccessMessage('示例图片不能操作');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    if (image.userId !== user.id) {
      setShowSuccessMessage('只能操作自己的图片');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    try {
      // 切换图片的展示状态：如果当前是公开的则隐藏，如果当前是隐藏的则显示
      const newPublicStatus = !image.isPublic; // 假设image对象有isPublic属性
      
      const { error: updateError } = await supabase
        .from('nano_user_images')
        .update({ 
          is_public: newPublicStatus,
          is_favorited: newPublicStatus // 如果展示则自动收藏
        })
        .eq('user_id', user.id)
        .eq('storage_path', image.storagePath ?? null);

      if (!updateError) {
        if (newPublicStatus) {
          // 图片现在公开了，显示成功消息
          setShowSuccessMessage(t('gallery.addedToGallery'));
          setTimeout(() => setShowSuccessMessage(null), 3000);
          
          // 刷新图片列表
          fetchAllImages();
        } else {
          // 图片现在隐藏了，从本地状态中移除
          setUserImages(prev => prev.filter(img => (img.storagePath || img.url) !== (image.storagePath || image.url)));
          setShowSuccessMessage(t('gallery.removedFromGallery'));
          setTimeout(() => setShowSuccessMessage(null), 3000);
        }
      } else {
        console.error('更新展示状态失败:', updateError);
        setShowSuccessMessage(t('gallery.operationFailed'));
        setTimeout(() => setShowSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error('切换展示状态失败:', error);
      setShowSuccessMessage(t('gallery.operationFailed'));
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  // 处理图片放大显示
  const handleImageZoom = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  // 关闭图片放大弹窗
  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  // 复制提示词到剪贴板
  const handleCopyPrompt = async (prompt: string, imageId: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedImageId(imageId);
      setShowSuccessMessage(t('gallery.promptCopied'));
      setTimeout(() => {
        setCopiedImageId(null);
        setShowSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('复制失败:', error);
      setShowSuccessMessage(t('gallery.copyFailed'));
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  // 删除图片
  const handleDeleteImage = async (image: GalleryImage) => {
    if (!user) {
      setShowSuccessMessage('请先登录');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    if (!image.isUserGenerated) {
      setShowSuccessMessage('示例图片不能删除');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    if (image.userId !== user.id) {
      setShowSuccessMessage('只能删除自己的图片');
      setTimeout(() => setShowSuccessMessage(null), 3000);
      return;
    }

    // 确认删除
    if (!confirm('确定要删除这张图片吗？此操作无法撤销。')) {
      return;
    }

    try {
      // 从数据库中删除记录
      const { error: deleteError } = await supabase
        .from('nano_user_images')
        .delete()
        .eq('id', image.id)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('删除图片失败:', deleteError);
        setShowSuccessMessage('删除失败，请重试');
        setTimeout(() => setShowSuccessMessage(null), 3000);
        return;
      }

      // 从本地状态中移除图片
      setUserImages(prev => prev.filter(img => img.id !== image.id));
      setShowSuccessMessage('图片已删除');
      setTimeout(() => setShowSuccessMessage(null), 3000);

      // 如果图片在Supabase存储中，也尝试删除
      if (image.storagePath) {
        try {
          const { error: storageError } = await supabase.storage
            .from('images')
            .remove([image.storagePath]);
          
          if (storageError) {
            console.warn('删除存储文件失败:', storageError);
            // 不显示错误，因为数据库记录已经删除
          }
        } catch (storageError) {
          console.warn('删除存储文件时出错:', storageError);
        }
      }
    } catch (error) {
      console.error('删除图片失败:', error);
      setShowSuccessMessage('删除失败，请重试');
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  };

  // 合并所有图片：首页只显示前6个示例图片，画廊页面显示所有图片
  const allImages = isHomePage ? sampleImages.slice(0, 6) : [...sampleImages, ...userImages];

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-0">
            {t('gallery.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-4 lg:px-0 mb-4 sm:mb-6">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* 成功提示消息 */}
        {showSuccessMessage && (
          <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 text-sm sm:text-base">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{showSuccessMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {allImages.map((image) => (
            <div key={`${image.isUserGenerated ? 'u' : 's'}-${image.id}`} className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={image.url} 
                  alt={t(image.titleKey)}
                  className="w-full h-96 sm:h-80 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 用户生成标识 */}
                {image.isUserGenerated && (
                  <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
                    <div className="bg-green-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                      {t('gallery.userGenerated.badge')}
                    </div>
                  </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300">
                  {/* 爱心按钮 - 所有用户都能看到，但只有创建者才能操作 */}
                  {!isHomePage && image.isUserGenerated && (
                    <button
                      onClick={() => handleHeartClick(image)}
                      disabled={!user || image.userId !== user?.id}
                      className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-lg touch-manipulation ${
                        user && image.userId === user?.id 
                          ? 'hover:bg-white active:scale-95 cursor-pointer' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      title={
                        !user 
                          ? '请先登录' 
                          : image.userId === user?.id 
                            ? t('gallery.removeFromGallery') 
                            : '只能操作自己的图片'
                      }
                    >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500 fill-current" />
                    </button>
                  )}

                  {/* 删除按钮 - 只有创建者才能看到和操作 */}
                  {!isHomePage && image.isUserGenerated && user && image.userId === user?.id && (
                    <button
                      onClick={() => handleDeleteImage(image)}
                      className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all duration-200 shadow-lg touch-manipulation"
                      title="删除图片"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" />
                    </button>
                  )}
                  
                  {/* 放大按钮 */}
                  {/* <button 
                    onClick={() => handleImageZoom(image)}
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-200 shadow-lg touch-manipulation"
                    title="放大查看"
                  >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-700" />
                  </button> */}
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <a 
            href="/gallery"
            className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 inline-block text-sm sm:text-base touch-manipulation"
          >
            {t('gallery.loadMore')}
          </a>
        </div>
      </div>

      {/* 图片模态框 */}
      <ImageModal
        isOpen={showImageModal}
        onClose={closeImageModal}
        imageUrl={selectedImage?.url || ''}
        imageTitle={selectedImage ? t(selectedImage.titleKey) : ''}
      />
    </section>
  );
};

export default Gallery;