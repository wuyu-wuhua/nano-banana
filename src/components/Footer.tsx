"use client"

import React from 'react';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { openFloatingSupport } from './FloatingSupport';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 relative">
                <Image 
                  src="/logo.png" 
                  alt="Nano Banana Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
                Nano Banana
              </span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              {t('footer.description')}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors duration-300"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="/draw" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.aiGenerator')}
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('nav.about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.refundPolicy')}
                </a>
              </li>
              <li>
                <a href="/cookie-settings" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                  {t('footer.cookies')}
                </a>
              </li>
              <li>
                <button 
                  onClick={openFloatingSupport}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                >
                  {t('footer.contact')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-0 text-center sm:text-left">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            <span>{t('footer.madeWith')}</span>
            <span>•</span>
            <span>{t('footer.poweredBy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;