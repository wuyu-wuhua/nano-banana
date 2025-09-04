import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingSupport from '../../components/FloatingSupport';
import Gallery from '../../components/Gallery';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Gallery />
      <FloatingSupport />
      <Footer />
    </div>
  );
}
