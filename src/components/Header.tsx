"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { UserDropdownMenu } from './ui/user-dropdown-menu';
import Link from 'next/link';
import { useAuth } from '../contexts/auth-context';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'zh' | 'zh-tw') => {
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center h-14 sm:h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2 mr-4 sm:mr-8 flex-shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
              <Image 
                src="/logo.png" 
                alt="Nano Banana Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
              Nano Banana
            </span>
          </Link>

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

          {/* Right side buttons - 往右侧靠 */}
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            {/* Language Toggle Button */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={toggleLanguageMenu}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-yellow-50 to-green-50 hover:from-yellow-100 hover:to-green-100 flex items-center justify-center transition-all duration-200 border border-yellow-200 hover:border-yellow-300"
                title={language === 'en' ? 'Switch Language' : language === 'zh' ? '切换语言' : '切換語言'}
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </button>
              
              {/* Language Dropdown Menu */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
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
                    中文简体
                  </button>
                  <button
                    onClick={() => handleLanguageChange('zh-tw')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      language === 'zh-tw' ? 'text-yellow-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    中文繁體
                  </button>
                </div>
              )}
            </div>

            {/* User Menu / Auth Buttons */}
            <div>
              {user ? (
                <UserDropdownMenu />
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="hidden md:inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>

            {/* Get Started Button */}
            <div className="hidden sm:block">
              <a href="/draw" className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base">
                {t('nav.getStarted')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button 
                onClick={toggleMenu}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden py-3 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <a 
                href="/" 
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a 
                href="/pricing" 
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.pricing')}
              </a>
              <a 
                href="/gallery" 
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.gallery')}
              </a>
              <a 
                href="/about" 
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              
              {/* Mobile Auth Button */}
              {!user && (
                <Link 
                  href="/auth/sign-in" 
                  className="mx-3 mt-2 text-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
              )}

              {/* Mobile Get Started Button */}
              <a 
                href="/draw" 
                className="mx-3 mt-3 bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 text-center touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
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