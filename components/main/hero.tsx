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
      
      // Improved mobile autoplay handling
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          // If autoplay fails, show poster image
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      };

      // Add event listeners for better mobile support
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        }
      };

      const handleTouchStart = () => {
        playVideo();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('touchstart', handleTouchStart, { once: true });

      playVideo();

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('touchstart', handleTouchStart);
      };
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
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: '-420px',
        left: 0,
        zIndex: -20,
      }}
    >
      <source src={process.env.NEXT_PUBLIC_VIDEO_WEBM || "/videos/earth.webm"} type="video/webm" />
      <source src={process.env.NEXT_PUBLIC_VIDEO_MP4 || "/videos/earth.mp4"} type="video/mp4" />
      Your browser does not support the video tag.
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
