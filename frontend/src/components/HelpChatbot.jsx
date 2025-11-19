import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const categories = {
  "Symptoms & Self-Assessment": [
    { q: "How do I check my symptoms?", a: "Tap the Symptom Checker, describe your issue, and BimarBandaAI will generate an instant assessment." },
    { q: "Can I check symptoms for someone else?", a: "Yes, you can assess symptoms for family members by entering their details manually." },
    { q: "Does the AI give accurate results?", a: "We provide probability-based guidance, not a medical diagnosis. Always consult a doctor." },
    { q: "Is my symptom history saved?", a: "Yes, your last assessments are saved securely in the app." },
    { q: "Can I talk to the AI using voice?", a: "Yes, voice input is available using AssemblyAI’s speech recognition." },
  ],

  "Nearby Doctors & Hospitals": [
    { q: "How to find nearby hospitals?", a: "Enter your location or allow GPS access. The app shows hospitals within 5–10 km." },
    { q: "Does it show doctor specialties?", a: "Yes, you can filter by cardiology, orthopedics, pediatrics, and more." },
    { q: "Is this feature free?", a: "Yes, location-based suggestions are completely free." },
    { q: "Can I see hospital ratings?", a: "Yes, ratings and basic details appear when available." },
    { q: "The app is not detecting my location, what to do?", a: "Enable GPS, grant permission, or type your location manually." },
  ],

  "Medicine & Remedies": [
    { q: "Does the app suggest medicines?", a: "Only OTC medicines and home remedies are suggested. No prescription drugs." },
    { q: "Are home remedies available?", a: "Yes, you get doctor-approved safe home remedies for common conditions." },
    { q: "Can I check dosage?", a: "We never provide dosage for safety reasons. Always consult a doctor." },
    { q: "Does it support Ayurveda?", a: "Yes, basic Ayurvedic remedies are provided for general wellness." },
    { q: "Can I save medicines to my list?", a: "Yes, you can bookmark suggestions for later use." },
  ],

  "Emergency Help": [
    { q: "What should I do in a medical emergency?", a: "Use the Emergency button to instantly get nearest emergency hospitals." },
    { q: "Does the app call an ambulance?", a: "We provide emergency numbers and nearby ambulance services." },
    { q: "Do you show first-aid instructions?", a: "Yes, we offer basic first-aid steps for common emergencies." },
    { q: "Is live doctor help available?", a: "Currently unavailable, but coming soon." },
    { q: "What if my condition is severe?", a: "Always go to the nearest hospital. The AI is not a replacement for doctors." },
  ],

  "Appointments & Reports": [
    { q: "Can I book a doctor appointment?", a: "Yes, partner doctors and clinics allow direct appointment booking." },
    { q: "Can I upload medical reports?", a: "Yes, you can upload reports and get AI-based summarized insights." },
    { q: "Will AI read my report?", a: "Yes, the AI can highlight important values but cannot diagnose." },
    { q: "Can I download my old assessments?", a: "Yes, you can export them from your Health Records section." },
    { q: "Is my data private?", a: "100% encrypted. Your data is never shared without your consent." },
  ],

  "General Health & App Usage": [
    { q: "What is BimarBandaAI?", a: "It is an AI-powered health assistant for symptoms, hospitals, emergencies, and reports." },
    { q: "Is the app free?", a: "Most features are free, premium report analysis is optional." },
    { q: "Which languages are supported?", a: "English, Hindi, Bengali, and more coming soon." },
    { q: "Can the AI talk?", a: "Yes, voice output is available using AssemblyAI's speech synthesis." },
    { q: "Does the app work offline?", a: "Basic features work offline, but AI and hospital search require internet." },
  ],
};

export default function HelpChatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋, I’m Prithvi from BimarBandaAI. What do you want to ask?" },
  ]);

  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCategoryClick = (category) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: category },
      { sender: "bot", text: `You selected ${category}. Choose a question:` },
    ]);
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleQuestionClick = (q, a) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: q },
      { sender: "bot", text: a },
      { sender: "bot", text: "Was this helpful? (Yes/No)" },
    ]);
  };

  const handleHelpful = (response) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: response },
      { sender: "bot", text: "Thank you for your feedback 🙏" },
    ]);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-[80vh] mx-auto rounded-xl overflow-hidden bg-white shadow-xl border border-emerald-500">

      {/* Header */}
      <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <h1 className="text-xl font-bold">Wanna know me?</h1>
        <p className="text-xs opacity-90">Ask anything about BimarBandaAI</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 p-2.5 rounded-full"
        >
          <X className="text-white" size={24} />
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
              msg.sender === "bot"
                ? "self-start bg-emerald-100 text-emerald-900"
                : "self-end bg-emerald-500 text-white"
            }`}
          >
            {msg.text === "Was this helpful? (Yes/No)" ? (
              <div className="flex flex-col gap-2">
                <span>{msg.text}</span>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => handleHelpful("Yes")}
                  >
                    👍
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => handleHelpful("No")}
                  >
                    👎
                  </button>
                </div>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Categories */}
        {showCategories && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Questions */}
        {selectedCategory && (
          <div className="flex flex-wrap gap-2 mt-2">
            {categories[selectedCategory].map((qa, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
                onClick={() => handleQuestionClick(qa.q, qa.a)}
              >
                {qa.q}
              </button>
            ))}
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

