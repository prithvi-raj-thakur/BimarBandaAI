import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#home' },
      { name: 'Features', href: '#features' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' }
    ],
    'Services': [
      { name: 'Emergency Support', href: '#' },
      { name: 'Mental Health', href: '#' },
      { name: 'Medicine Info', href: '#' },
      { name: 'Health Assessment', href: '#' }
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100027725361636', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/PRITHVI050906', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/_prithvi.fr_?igsh=OGJ5eTNwczM3eTdh', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/prithvi-raj-thakur-606500312/', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold">Bimarbanda.ai</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Revolutionizing healthcare with AI-powered solutions. Your health and wellbeing 
              are our top priorities, available 24/7 whenever you need us.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>support@bimarbanda.ai</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>+91 112-EMERGENCY</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">{title}</h3>
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6 sm:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Top Row: Copyright and Social */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">
              © {currentYear} Bimarbanda.ai. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-gray-500 text-xs text-center">
            Medical information provided is for educational purposes only.
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
          <p className="text-center text-xs sm:text-sm">
            <span className="font-bold text-red-400">Emergency?</span>{' '}
            <span className="text-gray-300">Call</span>{' '}
            <a href="tel:112" className="font-bold text-white hover:text-emerald-400 transition-colors">
              112
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}