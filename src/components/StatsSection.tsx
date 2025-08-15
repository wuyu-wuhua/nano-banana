import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-4xl font-bold text-yellow-600 mb-3 group-hover:scale-110 transition-transform duration-300">1M+</div>
            <div className="text-gray-700 font-medium">Images Generated</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-4xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-gray-700 font-medium">Happy Users</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
            <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">4.9★</div>
            <div className="text-gray-700 font-medium">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;