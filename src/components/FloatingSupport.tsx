"use client"

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// 全局状态管理悬浮球显示
let globalSetIsOpen: ((isOpen: boolean) => void) | null = null;

export const openFloatingSupport = () => {
  if (globalSetIsOpen) {
    globalSetIsOpen(true);
  }
};

const FloatingSupport: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 将在 useEffect 中设置
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // 设置默认位置为右侧中间
  useEffect(() => {
    const setDefaultPosition = () => {
      setPosition({
        x: window.innerWidth - 72, // 72px = 按钮宽度(48px) + 右边距(24px)
        y: window.innerHeight / 2 - 24 // 垂直居中，24px 是按钮高度的一半
      });
    };

    setDefaultPosition();
    window.addEventListener('resize', setDefaultPosition);
    
    return () => window.removeEventListener('resize', setDefaultPosition);
  }, []);

  // 注册全局状态
  useEffect(() => {
    globalSetIsOpen = setIsOpen;
    return () => {
      globalSetIsOpen = null;
    };
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Email button clicked!'); // 调试日志
    
    try {
      const url = 'https://mail.google.com/mail/u/0/?fs=1&to=media@nanobananamodle.com&su=Problem+Feedback&body=Please+describe+the+problem+you+encountered:&tf=cm';
      console.log('Opening URL:', url);
      
      const newWindow = window.open(url, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log('Window.open failed, trying direct navigation...');
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open email link:', error);
      // 备用方案：直接跳转
      window.location.href = 'https://mail.google.com/mail/u/0/?fs=1&to=media@nanobananamodle.com&su=Problem+Feedback&body=Please+describe+the+problem+you+encountered:&tf=cm';
    }
  };

  // 鼠标按下事件
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // 鼠标移动事件
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // 限制在视窗范围内
      const maxX = window.innerWidth - 48; // 48px = 按钮宽度
      const maxY = window.innerHeight - 48;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  // 鼠标松开事件
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      className="fixed z-50"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      ref={buttonRef}
      onMouseDown={handleMouseDown}
    >
      {/* Floating Button */}
      <button
        type="button"
        className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Customer Support"
        onClick={togglePopover}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute -top-24 right-[calc(100%+1rem)] w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-4 relative">
            <h3 className="text-lg font-semibold">{t('floating_support.title')}</h3>
            <button
              onClick={closePopover}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              aria-label={t('floating_support.close')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('floating_support.message')}
            </p>

            {/* Email Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{t('floating_support.customer_service_email')}</p>
                </div>
              </div>

              <button
                onClick={handleEmailClick}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                type="button"
              >
                media@nanobananamodle.com
              </button>

              <p className="text-xs text-gray-500 text-center">{t('floating_support.click_to_send')}</p>
              <p className="text-xs text-gray-500 text-center">{t('floating_support.response_time')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={closePopover}
        />
      )}
    </div>
  );
};

export default FloatingSupport;
