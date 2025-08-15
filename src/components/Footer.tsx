import React from 'react';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { openFloatingSupport } from './FloatingSupport';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
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
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Transform your imagination into stunning artwork with Nano Banana&apos;s cutting-edge AI technology. 
              Create, share, and discover amazing images from simple text prompts with Nano Banana.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors duration-300"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/draw" className="text-gray-400 hover:text-white transition-colors">
                  AI Generator
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <button 
                  onClick={openFloatingSupport}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Nano Banana. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Made with ❤️ for creators</span>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;