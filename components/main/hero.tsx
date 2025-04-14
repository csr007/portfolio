// Author: //sathwikreddychelemela
import { motion } from "framer-motion";
import { styles } from "@/styles";
import ComputersCanvas from "@/components/canvas/computers";
import { HeroContent } from "@/components/sub/hero-content";
import { Suspense, useEffect, useRef } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="rotate-180 absolute top-[-420px] left-0 w-full h-full object-cover -z-20"
    >
      <source src="/videos/earth.webm" type="video/webm" />
    </video>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <Suspense fallback={<div className="absolute top-[-420px] left-0 w-full h-full bg-black -z-20" />}>
        <VideoBackground />
      </Suspense>
      <HeroContent />
    </div>
  );
};
