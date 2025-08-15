"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              Home
            </a>
            <a href="/draw" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              AI Generator
            </a>
            <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Gallery
            </a>
            <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              About Us
            </a>
          </nav>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <a href="/draw" className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Get Started
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
                Home
              </a>
              <a href="/draw" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                AI Generator
              </a>
              <a href="/gallery" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                Gallery
              </a>
              <a href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium px-2">
                About Us
              </a>
              <a href="/draw" className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 mx-2 mt-2">
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;