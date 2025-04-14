// Author: //sathwikreddychelemela
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";
import CanvasLoader from "@/components/main/loader";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";

const Computers = ({ 
  isMobile,
  setCurrentView,
  setHasSeenMessage,
  initialRotation,
  setInitialRotation
}: { 
  isMobile: boolean;
  setCurrentView: (view: 'front' | null) => void;
  setHasSeenMessage: (seen: boolean) => void;
  initialRotation: number | null;
  setInitialRotation: (rotation: number | null) => void;
}) => {
  const computer = useGLTF("./realistic_moon/scene.gltf");
  const controlsRef = useRef<any>(null);
  const lastRotationRef = useRef<number | null>(null);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moonFacts = {
    front: {
      title: "Welcome to My Portfolio",
      description: "Thanks for exploring! Scroll down to discover my projects and skills."
    }
  };

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={3} position={[10, 10, 10]} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={4}
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight position={[10, 20, 10]} intensity={3} color={new THREE.Color(0xffffff)} castShadow />
      <primitive
        object={computer.scene}
        scale={isMobile ? 50 : 70}
        position={isMobile ? [0, 0, 0] : [0, -10, 0]}
        rotation={[-0.01, -0.2, -0.1]}
      />
      <OrbitControls 
        ref={controlsRef}
        enableZoom={false} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2}
        onChange={(e) => {
          if (!e) return;
          const currentRotation = e.target.getAzimuthalAngle();
          
          // Set initial rotation if not set
          if (initialRotation === null) {
            setInitialRotation(currentRotation);
            return;
          }

          // Calculate rotation difference from initial position
          const rotationDiff = currentRotation - initialRotation;
          
          // Show message in the first half of rotation (0 to π)
          if (rotationDiff > 0 && rotationDiff < Math.PI) {
            setCurrentView('front');
            setHasSeenMessage(true);
          } else {
            setCurrentView(null);
          }
        }}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ setMoonMessage }: { setMoonMessage: (message: { title: string; description: string } | null) => void }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState<'front' | null>(null);
  const [initialRotation, setInitialRotation] = useState<number | null>(null);
  const [hasSeenMessage, setHasSeenMessage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const moonFacts = {
    front: {
      title: "Welcome to My Portfolio",
      description: "Thanks for exploring! Scroll down to discover my work"
    }
  };

  useEffect(() => {
    if (currentView) {
      setMoonMessage(moonFacts[currentView]);
    } else {
      setMoonMessage(null);
    }
  }, [currentView, setMoonMessage]);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [isMobile ? 50 : 100, 20, 40], fov: isMobile ? 55 : 45 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Computers 
            isMobile={isMobile}
            setCurrentView={setCurrentView}
            setHasSeenMessage={setHasSeenMessage}
            initialRotation={initialRotation}
            setInitialRotation={setInitialRotation}
          />
        </Suspense>
        <Preload all />
      </Canvas>
      {!currentView && !hasSeenMessage && (
        <div className="absolute left-1/2 bottom-[-50px] transform -translate-x-1/2 z-[100]">
          <motion.div 
            className="text-4xl text-white"
            animate={{
              x: [-20, 20, -20],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              x: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            ⟷
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ComputersCanvas;
