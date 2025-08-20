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
    window.addEventListener("resize", checkMobile);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;

      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.log("Autoplay failed, showing poster image");
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          playVideo();
        }
      };

      const handleTouchStart = () => {
        playVideo();
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("touchstart", handleTouchStart, { once: true });

      playVideo();

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        document.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center -z-20">
      {/* Wrapper to crop video in circle */}
      <div
        className="overflow-hidden rounded-full shadow-xl relative"
        style={{
          width: isMobile ? "250px" : "400px",
          height: isMobile ? "250px" : "400px",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.3]" // scaled up 1.3x
          poster={process.env.NEXT_PUBLIC_VIDEO_POSTER || "/videos/earth-poster.jpg"}
        >
          <source
            src={process.env.NEXT_PUBLIC_VIDEO_MP4 || "/videos/earth.mp4"}
            type="video/mp4"
          />
          <source
            src={process.env.NEXT_PUBLIC_VIDEO_WEBM || "/videos/earth.webm"}
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex justify-center items-center -z-20">
            <div className="w-[400px] h-[400px] bg-black rounded-full" />
          </div>
        }
      >
        <VideoBackground />
      </Suspense>
      <HeroContent />
    </div>
  );
};
