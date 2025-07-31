import { motion } from "framer-motion";
import { styles } from "@/styles";
import ComputersCanvas from "@/components/canvas/computers";
import { HeroContent } from "@/components/sub/hero-content";
import { Suspense, useEffect, useRef, useState } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;

      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.log('Autoplay failed, showing poster image');
          videoRef.current?.load();
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        }
      };

      const handleTouchStart = () => playVideo();

      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('touchstart', handleTouchStart, { once: true });

      playVideo();

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden -z-20"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transform: 'translateY(-25%)', // shifts video upward to reveal half earth
        height: '130vh', // gives breathing room on tall screens
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={process.env.NEXT_PUBLIC_VIDEO_POSTER || "/videos/earth-poster.jpg"}
        className={`rotate-180 w-auto h-full object-contain`}
        style={{
          objectFit: 'contain',
          height: isMobile ? '120vh' : '110vh',
          backgroundColor: 'black',
        }}
      >
        <source src={process.env.NEXT_PUBLIC_VIDEO_MP4 || "/videos/earth.mp4"} type="video/mp4" />
        <source src={process.env.NEXT_PUBLIC_VIDEO_WEBM || "/videos/earth.webm"} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <Suspense fallback={<div className="absolute inset-0 bg-black -z-20" />}>
        <VideoBackground />
      </Suspense>
      <HeroContent />
    </div>
  );
};
