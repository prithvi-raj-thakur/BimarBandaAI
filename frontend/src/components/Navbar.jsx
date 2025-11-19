// import React, { useState, useEffect } from 'react';
// import { Menu, X, Phone } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'Home', href: '#home' },
//     { name: 'Features', href: '#features' },
//     { name: 'About Us', href: '#about' },
//     { name: 'Contact', href: '#contact' }
//   ];

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//       isScrolled ? 'py-3' : 'py-5'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`relative rounded-2xl transition-all duration-500 ${
//           isScrolled
//             ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-emerald-500/10'
//             : 'bg-white/60 backdrop-blur-md'
//         }`}>
//           <div className="flex items-center justify-between px-6 py-4">
//             {/* Logo Section */}
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                   <div className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                   </div>
//                 </div>
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
//                 Bimarbanda.ai
//               </span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-2">
//               {navItems.map((item, index) => (
//                 <a
//                   key={index}
//                   href={item.href}
//                   className="group relative px-6 py-2.5 rounded-xl overflow-hidden transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
//                   <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-xl transition-all duration-300"></div>
//                   <span className="relative text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
//                     {item.name}
//                   </span>
//                 </a>
//               ))}
//             </div>

//             {/* Help Button */}
//             <div className="flex items-center space-x-3">
//               <Button onClick={() => router.push("/components/helpChatbot")} className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105">
//                 <Phone className="w-4 h-4" />
//                 <span className="font-semibold">Help</span>
//               </Button>
              
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6 text-gray-700" />
//                 ) : (
//                   <Menu className="w-6 h-6 text-gray-700" />
//                 )}
//               </button>
//             </div>
//           </div>

//             {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="md:hidden border-t border-gray-200/50 px-4 sm:px-6 py-3 sm:py-4 space-y-1.5 sm:space-y-2">
//               {navItems.map((item, index) => (
//                 <a
//                   key={index}
//                   href={item.href}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-emerald-50 text-xs sm:text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//               <Button onClick={() => router.push("/components/helpChatbot")} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 sm:py-3 rounded-lg shadow-lg text-xs sm:text-sm">
//                 <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="font-semibold">Help</span>
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }


import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelpChatbot from "./HelpChatbot"; // << IMPORTANT

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // << ADD THIS

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-emerald-500/10"
                : "bg-white/60 backdrop-blur-md"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <div className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  BimarBandaAI
                </span>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="group relative px-6 py-2.5 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />
                    <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-xl transition-all duration-300" />
                    <span className="relative text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Help Button */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowChatbot(true)}  // << FIXED
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">Help</span>
                </Button>

                {/* Mobile menu */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200/50 px-4 py-3 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                ))}

                <Button
                  onClick={() => setShowChatbot(true)}  // << FIXED
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg shadow-lg text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">Help</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Help Chatbot */}
      {showChatbot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
          <div className="w-[500px] h-[600px] bg-white rounded-2xl shadow-2xl border border-green-500 overflow-hidden">
            <HelpChatbot onClose={() => setShowChatbot(false)} />
          </div>
        </div>
      )}

    </>
  );
}
