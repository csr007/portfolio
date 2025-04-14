// Author: //sathwikreddychelemela
'use client';

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ComputersCanvas } from "@/components/canvas";
import { useMediaQuery } from "react-responsive"; // Import Media Query Hook
import { styles } from "@/styles";
import { fadeIn, textVariant } from "@/utils/motion";
import { useInView } from "react-intersection-observer";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const [text, setText] = useState(""); // The text being typed
  const [phraseIndex, setPhraseIndex] = useState(0); // Index of current phrase
  const [charIndex, setCharIndex] = useState(0); // Current character index in the phrase
  const [deleting, setDeleting] = useState(false); // Flag to determine if we're backspacing
  const [moonMessage, setMoonMessage] = useState<{ title: string; description: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const roles = [
    "I'm a Data Engineer",
    "I'm an AI Engineer",
    "I'm a Data Scientist"
  ];

  const typingSpeed = 100;
  const backspaceSpeed = 50;
  const pauseDuration = 1000;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeEffect = () => {
      const currentPhrase = roles[phraseIndex];

      if (!deleting && charIndex < currentPhrase.length) {
        setText((prevText) => prevText + currentPhrase[charIndex]);
        setCharIndex((prevIndex) => prevIndex + 1);
        timeoutId = setTimeout(typeEffect, typingSpeed);
      } else if (deleting && charIndex > 0) {
        setText((prevText) => prevText.slice(0, charIndex - 1));
        setCharIndex((prevIndex) => prevIndex - 1);
        timeoutId = setTimeout(typeEffect, backspaceSpeed);
      } else if (!deleting && charIndex === currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDeleting(true);
          typeEffect();
        }, pauseDuration);
      } else if (deleting && charIndex === 0) {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setDeleting(false);
        timeoutId = setTimeout(typeEffect, typingSpeed);
      }
    };

    timeoutId = setTimeout(typeEffect, typingSpeed);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [charIndex, phraseIndex, deleting]);

  // Check if mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playIntroduction = () => {
    if (isPlaying) return;
    
    try {
      setIsPlaying(true);
      const audio = new Audio('/introduction.mp3');
      
      audio.onerror = (error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      };
      
      audio.onended = () => {
        setIsPlaying(false);
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`flex ${isMobile ? "flex-col-reverse" : "flex-row"} 
        items-center justify-center px-4 md:px-20 mt-20 md:mt-40 w-full z-[20]`}
    >
      {/* Text Section */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-center md:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[6px] px-[7px] border border-[#7042f88b] opacity-[0.9] inline-flex items-center justify-center mx-auto md:mx-0"
        >
          <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
          <h1 className="Welcome-text text-[12px] md:text-[13px]">
            Full Stack AI-Powered Portfolio
          </h1>
        </motion.div>

        {moonMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              mass: 1,
              duration: 1
            }}
            className="w-full max-w-[300px] mx-auto md:mx-0 mb-6"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
              willChange: "transform"
            }}
          >
            <motion.div
              className="bg-black/70 text-white px-6 py-3 rounded-lg border-2 border-white/30 shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotateX: [0, 5, 0]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateX: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="text-purple-400 mb-2 text-xl font-bold tracking-wide"
              >
                {moonMessage.title}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="text-base font-normal text-gray-300 leading-relaxed"
              >
                {moonMessage.description}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 text-2xl md:text-4xl font-bold text-white max-w-[600px] mx-auto md:mx-0"
        >
          <h1 className="text-4xl font-bold text-white">
            Hi, I'm <span className="text-purple-500">Sathwik</span>
          </h1>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-md md:text-lg text-gray-400 my-3 md:my-5 max-w-[600px] mx-auto md:mx-0"
        >
          {text}
        </motion.p>

        <motion.p
          variants={slideInFromLeft(1)}
          className="text-md md:text-lg text-gray-400 my-3 md:my-5 max-w-[600px] mx-auto md:mx-0"
        >
          Experienced in Generative AI, Deep Learning, Machine Learning, and full-stack web development, leveraging cutting-edge technologies to create intelligent data-driven solutions.
        </motion.p>

        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/sathwikreddychelemela/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.013-1.227-2.013-1.227 0-1.415.957-1.415 1.949v5.668h-3v-11h2.85v1.649h.041c.5-.945 1.722-1.943 3.544-1.943 3.789 0 4.5 2.494 4.5 5.739v6.555z"/>
            </svg>
          </a>
          <a
            href="https://github.com/sathwikreddychelemela"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="mailto:sathwikreddychelemela@gmail.com"
            className="text-gray-400 hover:text-purple-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Computer 3D Model Section */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full flex justify-center items-center mt-8 md:mt-0"
        style={{ height: isMobile ? "300px" : "500px" }}
      >
        <ComputersCanvas setMoonMessage={setMoonMessage} />
      </motion.div>
    </motion.div>
  );
};
