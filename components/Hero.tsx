// Author: //sathwikreddychelemela
import { motion } from "framer-motion";
import { styles } from "@/styles";
import ComputersCanvas from "@/components/canvas/computers";
import { HeroContent } from "@/components/sub/hero-content";
import { useEffect, useState } from "react";
import { Suspense } from "react";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [moonMessage, setMoonMessage] = useState<{ title: string; description: string; } | null>(null);

  useEffect(() => {
    // First step: Load 3D model
    const modelTimer = setTimeout(() => {
      setIsLoading(false);
      // Second step: Show welcome message after model is loaded
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
      }, 1000);
      return () => clearTimeout(welcomeTimer);
    }, 2000);

    return () => clearTimeout(modelTimer);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Sathwik</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a passionate developer crafting innovative solutions with modern technologies.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <Suspense fallback={null}>
            <ComputersCanvas setMoonMessage={setMoonMessage} />
          </Suspense>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed right-8 top-[40%] transform -translate-y-1/2 z-[100]"
            >
              <div className="bg-black/70 text-white px-6 py-3 rounded-lg border-2 border-white/30 shadow-lg max-w-[300px]">
                <div className="text-purple-400 mb-2 text-xl font-bold tracking-wide">Welcome to My Portfolio</div>
                <div className="text-base font-normal text-gray-300 leading-relaxed">
                  I'm a passionate developer crafting innovative solutions with modern technologies.
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero; 