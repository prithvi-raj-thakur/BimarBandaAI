// import React, { useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Zap, Shield, Heart } from 'lucide-react';

// export default function HeroSection() {
//   const heroRef = useRef(null);
//   const imageRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     // Simple animation using CSS transitions
//     if (textRef.current) {
//       setTimeout(() => {
//         textRef.current.style.opacity = '1';
//         textRef.current.style.transform = 'translateX(0)';
//       }, 100);
//     }
//     if (imageRef.current) {
//       setTimeout(() => {
//         imageRef.current.style.opacity = '1';
//         imageRef.current.style.transform = 'translateX(0) scale(1)';
//       }, 300);
//     }
//   }, []);

//   return (
//     <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white mt-16 sm:mt-20 md:mt-24">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-24 sm:top-40 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
//           {/* Text Content */}
//           <div
//             ref={textRef}
//             className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 opacity-0 transform -translate-x-8 transition-all duration-1000 ease-out order-2 md:order-1"
//           >
//             <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-emerald-100 rounded-full">
//               <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
//               <span className="text-xs sm:text-sm font-semibold text-emerald-700">AI-Powered Healthcare</span>
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
//               <span className="text-gray-900">Your Health,</span>
//               <br />
//               <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
//                 Our Priority
//               </span>
//             </h1>

//             <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl">
//               Experience instant medical assistance powered by AI. Get expert guidance,
//               emergency support, and comprehensive health solutions at your fingertips—24/7.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
//               <Button className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg sm:rounded-xl shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-105 w-full sm:w-auto">
//                 <span className="font-semibold">Get Started</span>
//                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button variant="outline" className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg sm:rounded-xl border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 w-full sm:w-auto">
//                 <span className="font-semibold text-gray-700">Learn More</span>
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 md:pt-8">
//               <div className="space-y-0.5 sm:space-y-1">
//                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">24/7</div>
//                 <div className="text-xs sm:text-xs md:text-sm text-gray-600">Available</div>
//               </div>
//               <div className="space-y-0.5 sm:space-y-1">
//                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">10k+</div>
//                 <div className="text-xs sm:text-xs md:text-sm text-gray-600">Users</div>
//               </div>
//               <div className="space-y-0.5 sm:space-y-1">
//                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">99%</div>
//                 <div className="text-xs sm:text-xs md:text-sm text-gray-600">Success</div>
//               </div>
//             </div>
//           </div>

//           {/* Hero Image */}
//           <div
//             ref={imageRef}
//             className="relative opacity-0 transform translate-x-8 scale-95 transition-all duration-1000 ease-out delay-300 order-1 md:order-2 w-full md:w-auto"
//           >
//             <div className="relative">
//               {/* Glass Card with Image */}
//               <div className="relative rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl shadow-lg sm:shadow-xl lg:shadow-2xl p-1.5 sm:p-2 md:p-3 lg:p-6 xl:p-8 border border-white/20 mx-auto max-w-sm sm:max-w-md md:max-w-none">
//                 <img
//                   src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
//                   alt="Medical Professional"
//                   className="w-full h-32 sm:h-48 md:h-56 lg:h-72 xl:h-96 object-cover rounded-lg sm:rounded-lg lg:rounded-2xl"
//                 />
                
//                 {/* Floating Cards */}
//                 <div className="absolute top-1 sm:top-2 md:top-4 -left-1 sm:-left-2 md:-left-4 bg-white/95 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-2xl p-1 sm:p-2 md:p-3 lg:p-4 shadow-md sm:shadow-lg md:shadow-xl animate-float">
//                   <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-3">
//                     <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-md md:rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-600" />
//                     </div>
//                     <div className="min-w-0">
//                       <div className="text-xs sm:text-xs md:text-sm font-semibold text-gray-900 truncate">Heart Rate</div>
//                       <div className="text-xs text-gray-500">72 BPM</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 -right-1 sm:-right-2 md:-right-4 bg-white/95 backdrop-blur-md rounded-md sm:rounded-lg md:rounded-2xl p-1 sm:p-2 md:p-3 lg:p-4 shadow-md sm:shadow-lg md:shadow-xl animate-float animation-delay-2000">
//                   <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-3">
//                     <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-md md:rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-600" />
//                     </div>
//                     <div className="min-w-0">
//                       <div className="text-xs sm:text-xs md:text-sm font-semibold text-gray-900 truncate">Protected</div>
//                       <div className="text-xs text-gray-500">AI Secured</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative Elements */}
//               <div className="absolute -z-10 top-3 sm:top-5 md:top-10 right-3 sm:right-5 md:right-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-30"></div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Heart } from "lucide-react";

export default function HeroSection() {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setTimeout(() => {
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }, 100);
    }
    if (imageRef.current) {
      setTimeout(() => {
        imageRef.current.style.opacity = "1";
        imageRef.current.style.transform = "translateY(0) scale(1)";
      }, 300);
    }
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50/30 to-white pt-24 pb-10 overflow-hidden">

      {/* Background */} 
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-60 h-60 bg-emerald-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-60 h-60 bg-emerald-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-60 h-60 bg-emerald-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 text-center md:text-left">

          {/* TEXT CONTENT */}
          <div
            ref={textRef}
            className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
          >
            <div className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-2 bg-emerald-100 rounded-full mx-auto md:mx-0">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                AI-Powered Healthcare
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 leading-tight">
              <span className="text-gray-900">Your Health,</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            <p className="text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0 text-sm md:text-base mt-4">
              Experience instant medical assistance powered by AI. Get expert
              guidance, emergency support, and comprehensive health solutions at
              your fingertips—24/7.
            </p>

            <div  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
              <Button className="group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:scale-105 transition">
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Button>

              <Button
                variant="outline"
                className="border-2 hover:border-emerald-500 hover:bg-emerald-50"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xs mx-auto md:mx-0">
              <div>
                <div className="text-3xl font-bold text-emerald-600">24/7</div>
                <div className="text-gray-600 text-sm">Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">10k+</div>
                <div className="text-gray-600 text-sm">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">99%</div>
                <div className="text-gray-600 text-sm">Success</div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div
            ref={imageRef}
            className="relative opacity-0 transform translate-y-8 scale-95 transition-all duration-700 ease-out mx-auto md:mx-0"
          >
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto">
              <div className="rounded-2xl bg-white/70 backdrop-blur-md p-3 shadow-xl border border-white/40">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
                  className="rounded-xl object-cover w-full h-64 sm:h-72 md:h-80 lg:h-[22rem]"
                  alt="Medical Professional"
                />

                {/* Floating Cards */}
                <div className="absolute top-3 -left-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Heart Rate</p>
                      <p className="text-xs text-gray-500">72 BPM</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 -right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg animate-float animation-delay-2000">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Protected</p>
                      <p className="text-xs text-gray-500">AI Secured</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow bubble */}
              <div className="absolute -z-10 top-10 right-10 w-48 h-48 bg-emerald-200 blur-3xl opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
