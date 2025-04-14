"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  const [isTimeTraveling, setIsTimeTraveling] = useState(false);

  useEffect(() => {
    const handleTimeTravel = () => {
      setIsTimeTraveling(true);
      setTimeout(() => setIsTimeTraveling(false), 2000);
    };

    window.addEventListener('timeTravel', handleTimeTravel);
    return () => window.removeEventListener('timeTravel', handleTimeTravel);
  }, []);

  return (
    <div className="w-full h-auto fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
      <div className={`stars-container absolute inset-0 pointer-events-none transition-all duration-1000 ${isTimeTraveling ? 'time-travel' : ''}`}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.2,
              transition: 'all 1s ease-out',
              transform: `translateZ(${Math.random() * 100}px)`,
              animation: isTimeTraveling ? `timeTravel ${1 + Math.random()}s linear infinite` : 'none',
              animationDelay: `${Math.random() * 2}s`,
              background: isTimeTraveling ? `radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)` : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes timeTravel {
          0% {
            transform: translateZ(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateZ(1000px) scale(0);
            opacity: 0;
          }
        }

        .time-travel {
          background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%);
        }

        .star {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};
