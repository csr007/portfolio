'use client';  // This marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInFromRight } from '@/lib/motion';

interface TypingMessageProps {
  text: string;
  sender: string;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ text, sender }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sender === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        sender === 'bot' 
          ? 'bg-purple-500/20 border border-purple-500/30' 
          : 'bg-white/10 border border-white/20'
      }`}>
        <div className={`text-sm font-medium mb-1 ${
          sender === 'bot' ? 'text-purple-400' : 'text-white'
        }`}>
          {sender === 'bot' ? 'Sathwik' : 'You'}
        </div>
        <div className="text-white text-sm leading-relaxed">
          {displayedText}
        </div>
      </div>
    </motion.div>
  );
};

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    const userInput = (document.getElementById("user-input") as HTMLInputElement).value;
    if (!userInput) return;

    // Add user message immediately
    setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
    (document.getElementById("user-input") as HTMLInputElement).value = "";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Add bot message with typing effect
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages(prev => [...prev, { text: "Error: Unable to fetch response.", sender: 'bot' }]);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        className={isChatOpen ? "stop-floating" : ""}
        onClick={toggleChat}
      >
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500/20 border border-purple-500/30 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
            >
              Ask me anything! 
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative mt-2"
        >
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
          <img
            src="./assets/chatbot_pic.png"
            alt="Sathwik"
            className="w-12 h-12 rounded-full border-2 border-purple-500/30 relative z-10"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInFromRight(0.2)}
            id="chat-container"
            className="fixed bottom-24 right-5 w-[350px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-500/20 border-b border-purple-500/30 p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  src="./assets/chatbot_pic.png"
                  alt="Sathwik"
                  className="w-8 h-8 rounded-full border border-purple-500/30"
                />
                <span className="text-white font-medium">AI Assistant</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="text-white/70 hover:text-white text-xl"
              >
                ×
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 h-[calc(100%-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <TypingMessage
                  key={index}
                  text={message.text}
                  sender={message.sender}
                />
              ))}
              <div ref={messagesEndRef} />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 w-full p-4 bg-black/40 backdrop-blur-sm border-t border-white/10"
            >
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="user-input"
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition-colors"
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
