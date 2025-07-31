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
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      };

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
        window.removeEventListener('resize', checkMobile);
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
      className={`rotate-180 absolute left-0 top-0 w-full h-full -z-20`}
      poster={process.env.NEXT_PUBLIC_VIDEO_POSTER || "/videos/earth-poster.jpg"}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain', // <--- KEY CHANGE: preserve full video frame
        transform: isMobile ? 'scale(1.1)' : 'scale(1)', // adjust slightly to avoid black borders
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -20,
        backgroundColor: 'black', // fallback if video doesn’t fill
      }}
    >
      <source src={process.env.NEXT_PUBLIC_VIDEO_MP4 || "/videos/earth.mp4"} type="video/mp4" />
      <source src={process.env.NEXT_PUBLIC_VIDEO_WEBM || "/videos/earth.webm"} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-screen w-full">
      <Suspense fallback={<div className="absolute inset-0 bg-black -z-20" />}>
        <VideoBackground />
      </Suspense>
      <HeroContent />
    </div>
  );
};
