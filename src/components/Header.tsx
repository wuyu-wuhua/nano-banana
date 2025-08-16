"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { UserDropdownMenu } from './ui/user-dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  // 点击外部关闭语言菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 mr-8">
            <div className="w-8 h-8 relative">
              <Image 
                src="/logo.png" 
                alt="Nano Banana Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
              Nano Banana
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1">
            <a href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.home')}
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.pricing')}
            </a>
            <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.gallery')}
            </a>
            <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.about')}
            </a>
          </nav>

          {/* Language Toggle Button */}
          <div className="hidden md:block mr-4 relative" ref={languageMenuRef}>
            <button
              onClick={toggleLanguageMenu}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 border border-gray-200"
              title={language === 'en' ? 'Switch Language' : '切换语言'}
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Language Dropdown Menu */}
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    language === 'en' ? 'text-yellow-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('zh')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    language === 'zh' ? 'text-yellow-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  中文
                </button>
              </div>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:block mr-4">
            <UserDropdownMenu />
          </div>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <a href="/draw" className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              {t('nav.getStarted')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-2">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.home')}
              </a>
              <a href="/pricing" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.pricing')}
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.gallery')}
              </a>
              <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.about')}
              </a>
              
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center justify-center space-x-2 px-4 py-2 mx-2 rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'en' ? '中文' : 'EN'}
                </span>
              </button>
              
              {/* Mobile User Menu */}
              <div className="px-2">
                <UserDropdownMenu />
              </div>
              
              <a href="/draw" className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 mx-2 mt-2">
                {t('nav.getStarted')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;