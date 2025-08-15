"use client"

import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { UserDropdownMenu } from './ui/user-dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

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
              定价
            </a>
            <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.gallery')}
            </a>
            <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              {t('nav.about')}
            </a>
          </nav>

          {/* Language Toggle Button */}
          <div className="hidden md:block mr-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-200"
              title={language === 'en' ? '切换到中文' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
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
                定价
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.gallery')}
              </a>
              <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                {t('nav.about')}
              </a>
              
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
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