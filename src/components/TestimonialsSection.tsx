import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Digital Artist',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Nano Banana has revolutionized my creative workflow. The quality of AI-generated images is absolutely stunning, and the variety of styles available is incredible. I use it daily for my client projects.'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Marketing Director',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'As a marketing professional, I need high-quality visuals quickly. Nano Banana delivers exactly that. The speed and quality are unmatched, and it has saved our team countless hours and budget.'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Content Creator',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'I was skeptical about AI art at first, but Nano Banana completely changed my mind. The images are so detailed and creative - sometimes even better than what I had imagined. It\'s like having a personal artist.'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Game Developer',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'For concept art and game assets, Nano Banana is a game-changer. The variety of styles and the ability to iterate quickly has accelerated our development process significantly. Highly recommended!'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Small Business Owner',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Running a small business, I needed affordable yet professional visuals for my marketing. Nano Banana provides exactly that. The quality rivals expensive stock photos, but with complete customization.'
    },
    {
      id: 6,
      name: 'Alex Johnson',
      role: 'Freelance Designer',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The creative possibilities with Nano Banana are endless. I can explore ideas and concepts that would take hours to create manually. It\'s become an essential tool in my design arsenal.'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied creators who have transformed their ideas into stunning artwork with Nano Banana. 
            Here&apos;s what they have to say about their Nano Banana experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-8 h-8 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">4.9</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(5)}
              </div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600 text-sm">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600 text-sm">Images Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;