import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const [visibleImages, setVisibleImages] = useState([false, false, false]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate images one by one
            setTimeout(() => setVisibleImages(prev => [true, prev[1], prev[2]]), 100);
            setTimeout(() => setVisibleImages(prev => [prev[0], true, prev[2]]), 400);
            setTimeout(() => setVisibleImages(prev => [prev[0], prev[1], true]), 700);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&auto=format&fit=crop',
      alt: 'Medical Team'
    },
    {
      url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop',
      alt: 'Healthcare Technology'
    },
    {
      url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop',
      alt: 'Emergency Care'
    }
  ];

  const features = [
    'AI-powered medical diagnosis and recommendations',
    'Instant connection to verified healthcare professionals',
    'Comprehensive medicine database with detailed information',
    'Mental health support and assessment tools',
    'Emergency response coordination and location tracking',
    'Secure health records and consultation history'
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            About <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">BimarBandaAI</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing healthcare accessibility through artificial intelligence and compassionate care
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Gallery */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${index === 2 ? 'col-span-2' : ''} transform transition-all duration-1000 ${
                    visibleImages[index]
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-emerald-300 rounded-full filter blur-3xl opacity-20"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Empowering Health Through Innovation
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                BimarBandaAI combines cutting-edge artificial intelligence with healthcare expertise 
                to provide instant, reliable medical assistance. Our platform bridges the gap between 
                patients and healthcare services, ensuring everyone has access to quality medical guidance.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                From emergency situations to routine health queries, we're committed to being your 
                trusted healthcare companion, available whenever you need us.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 transform transition-all duration-500 hover:translate-x-2"
                  style={{
                    animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold">
                Discover Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}