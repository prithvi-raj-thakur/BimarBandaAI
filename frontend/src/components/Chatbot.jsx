// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Send, HeartPulse, UserRound, X } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// function formatMessage(text) {
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   return text.split(urlRegex).map((part, i) =>
//     urlRegex.test(part) ? (
//       <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//         {part}
//       </a>
//     ) : (
//       part
//     )
//   );
// }

// export default function Chatbot({ onClose }) {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text:
//         "💙 **Welcome to BimarBandaAI!**\n\nI'm your friendly health assistant. Tell me how you're feeling — symptoms, doubts, stress, anything.\n\n✨ 'Your body whispers before it screams. Listen with love.'"
//     }
//   ]);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const chatEndRef = useRef(null);

//   // scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       const response = await axios.post(`${API_BASE}/chat`, {
//         session_id: "bimarbanda_user_001",
//         message: input
//       });
//       setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
//     } catch (err) {
//       setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Unable to connect to server. Please try again later." }]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   // handle enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // close handler that also ensures page returns to top (main view)
//   const handleClose = () => {
//     if (typeof onClose === "function") onClose();
//     // restore scroll to top to "return to main page" feel
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="flex flex-col h-full w-full bg-gradient-to-b from-blue-50 to-teal-50">
//       {/* header with inline close button */}
//       <div className="flex items-center justify-between px-4 py-3 bg-white/90 border-b">
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-full bg-blue-100">
//             <HeartPulse className="text-blue-600" />
//           </div>
//           <div>
//             <div className="text-lg font-semibold text-blue-700">BimarBandaAI — Health Assistant</div>
//             <div className="text-xs text-gray-500">Ask about symptoms, meds, or health tips</div>
//           </div>
//         </div>

//         {/* Close button placed on same line as title */}
//         <button
//           onClick={handleClose}
//           className="ml-4 px-3 py-2 rounded-md bg-red-50 hover:bg-red-100 text-red-600 flex items-center gap-2"
//           aria-label="Close chat"
//         >
//           <X className="w-4 h-4" />
//           <span className="hidden sm:inline text-sm">Close</span>
//         </button>
//       </div>

//       {/* chat area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start`}>
//             {msg.sender === "bot" && (
//               <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center shadow mr-2">🤖</div>
//             )}

//             <div className={`max-w-[85%] md:max-w-md px-4 py-3 rounded-2xl shadow-md text-sm whitespace-pre-line leading-relaxed ${
//               msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
//             }`}>
//               {formatMessage(msg.text)}
//             </div>

//             {msg.sender === "user" && (
//               <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow ml-2">
//                 <UserRound size={18} />
//               </div>
//             )}
//           </div>
//         ))}

//         {isTyping && <div className="text-gray-600 text-sm pl-12 animate-pulse">⏳ BimarBandaAI is typing...</div>}

//         <div ref={chatEndRef} />
//       </div>

//       {/* input area */}
//       <form
//         className="p-3 bg-white/95 border-t flex items-center gap-2"
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendMessage();
//         }}
//       >
//         <textarea
//           rows={1}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Tell me what you're feeling..."
//           className="flex-1 resize-none border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm max-h-40"
//         />

//         <button
//           type="submit"
//           disabled={!input.trim()}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
//         >
//           <Send size={18} />
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Mic,
  Square,
  Volume2,
  VolumeX,
  UserRound,
  Headphones,
  X,
  Send
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "💚 Welcome to BimarBandaAI! You can speak or type your symptoms." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [srSupported, setSrSupported] = useState(true);

  const chatEndRef = useRef(null);
  const recognizerRef = useRef(null);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const lastUtterRef = useRef(null);

  // --- Setup SpeechRecognition once ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSrSupported(false);
      return;
    }
    const recognizer = new SpeechRecognition();
    recognizer.lang = "en-IN";
    recognizer.continuous = false;
    recognizer.interimResults = false;

    recognizer.onstart = () => {
      setListening(true);
    };

    recognizer.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("");
      setInput(transcript);
      // automatically send final transcript
      sendMessage(transcript);
    };

    recognizer.onerror = (e) => {
      console.error("SpeechRecognition error:", e);
      setListening(false);
    };

    recognizer.onend = () => {
      setListening(false);
    };

    recognizerRef.current = recognizer;

    return () => {
      try {
        recognizer.onstart = null;
        recognizer.onresult = null;
        recognizer.onerror = null;
        recognizer.onend = null;
      } catch (e) {}
      recognizerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto scroll ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, listening]);

  // --- Speak helper (respects soundOn) ---
  const speakText = (text) => {
    if (!soundOn) return;
    if (!("speechSynthesis" in window)) return;

    const synth = synthRef.current;
    if (synth.speaking) {
      try { synth.cancel(); } catch (e) {}
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.onstart = () => {};
    utter.onend = () => {};
    utter.onerror = (e) => {
      console.error("TTS error:", e);
    };
    lastUtterRef.current = utter;
    synth.speak(utter);
  };

  // --- Toggle sound (mute/unmute) ---
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (!next) {
      // if turning mute ON (soundOff), cancel any current speech immediately
      if (synthRef.current?.speaking) {
        try {
          synthRef.current.cancel();
        } catch (e) {}
      }
    }
  };

  // --- Start / stop listening ---
  const startListening = () => {
    const recognizer = recognizerRef.current;
    if (!recognizer) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    try {
      recognizer.start();
    } catch (e) {
      // sometimes start throws if already running — handle gracefully
      console.warn("recognizer.start error:", e);
      try {
        recognizer.stop();
        recognizer.start();
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const stopListening = () => {
    const recognizer = recognizerRef.current;
    if (recognizer) {
      try {
        recognizer.stop();
      } catch (e) {}
    }
    setListening(false);
  };

  // --- Send message to backend and update UI ---
  const sendMessage = async (maybeText) => {
    const text = (maybeText !== undefined ? maybeText : input).trim();
    if (!text) return;
    // add user message
    setMessages(prev => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        session_id: "bimarbanda_voice_001",
        message: text
      }, { timeout: 20000 });

      const botReply = res?.data?.reply ?? "Sorry, I couldn't get a reply.";
      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
      // speak if not muted
      speakText(botReply);
    } catch (err) {
      console.error("chat error:", err);
      const errMsg = "⚠️ Server is unreachable. Please try again later.";
      setMessages(prev => [...prev, { sender: "bot", text: errMsg }]);
      // speak error only if soundOn
      speakText(errMsg);
    } finally {
      setIsTyping(false);
    }
  };

  // --- keyboard handler: Enter sends (Shift+Enter newline) ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Ensure we stop recognition and TTS when closing
  const handleClose = () => {
    stopListening();
    if (synthRef.current?.speaking) {
      try { synthRef.current.cancel(); } catch (e) {}
    }
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="flex flex-col h-full w-full bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-green-600 text-white shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-green-700 font-bold">
            💚
          </div>
          <div>
            <div className="text-lg font-semibold">BimarBandaAI – Chatbot</div>
            <div className="text-xs text-green-100">Speak or type your health concern</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30"
            title={soundOn ? "Mute bot" : "Unmute bot"}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button onClick={handleClose} className="p-2 rounded-full bg-white/20 hover:bg-white/30" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}
          >
            {msg.sender === "bot" && (
              <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                <Headphones size={18} />
              </div>
            )}

            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow ${
                msg.sender === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-100 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center shadow">
                <UserRound size={18} />
              </div>
            )}
          </div>
        ))}

        {isTyping && <div className="text-green-600 pl-4 animate-pulse">BimarBandaAI is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or press mic to speak... (Enter to send)"
          className="flex-1 resize-none border border-green-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* mic / listening indicator */}
        {!listening ? (
          <button
            type="button"
            onClick={startListening}
            className="bg-green-600 text-white px-3 py-2 rounded-xl shadow"
            title="Start listening"
            aria-pressed={listening}
          >
            <Mic size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={stopListening}
            className="bg-red-600 text-white px-3 py-2 rounded-xl shadow animate-pulse"
            title="Stop listening"
          >
            <Square size={18} />
          </button>
        )}

        {/* Send button */}
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow ${
            input.trim() ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          title="Send message"
        >
          <Send size={16} />
        </button>
      </div>

      {!srSupported && (
        <div className="p-2 text-sm text-yellow-700 bg-yellow-50 border-t">Speech recognition not supported in this browser. Use typing instead.</div>
      )}
    </div>
  );
}
