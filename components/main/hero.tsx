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
      // Add this to handle mobile autoplay
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, show a fallback
          videoRef.current?.load();
        });
      }
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
      poster={process.env.NEXT_PUBLIC_VIDEO_POSTER || "/videos/earth-poster.jpg"}
    >
      <source src={process.env.NEXT_PUBLIC_VIDEO_WEBM || "/videos/earth.webm"} type="video/webm" />
      <source src={process.env.NEXT_PUBLIC_VIDEO_MP4 || "/videos/earth.mp4"} type="video/mp4" />
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
