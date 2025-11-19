import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import AboutSection from './components/AboutSection';
import MedicineCards from './components/MedicineCards';
import MentalHealthAssessment from './components/MentalHealthAssessment';
import FeedbackSection from './components/FeedbackSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useState, useEffect } from "react";
import HelpChatbot from './components/HelpChatbot';
import Chatbot from './components/Chatbot';



function App() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* NAVBAR - Fixed, so no extra padding needed */}
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <AboutSection />
      <MedicineCards />
      <MentalHealthAssessment />
      <FeedbackSection />
      <ContactForm />
      <Footer />
  

      {/* CHAT BUTTON */}
      {!openChat && (
        <button
          onClick={() => setOpenChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 z-50"
          aria-label="Open Chat"
        >
          💬 Chat Now
        </button>
      )}

      {/* CHAT BOT FULLSCREEN PANEL */}
      {openChat && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenChat(false)}
          />

          {/* Chat Panel */}
          <div className="relative z-50 w-full h-full md:max-w-3xl md:h-[90vh] md:rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden mx-4 my-6">
            <Chatbot onClose={() => setOpenChat(false)} />
          </div>
        </div>
      )}
    </div>
  );
}


export default App;


