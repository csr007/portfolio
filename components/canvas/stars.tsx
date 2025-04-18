// Author: //sathwikreddychelemela
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { useRef, Suspense, useState } from "react";
import type { Points as PointsType } from "three";
import * as THREE from "three";

// Stars
const Stars = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  // For each star
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 }),
  );

  // Rotate multiple stars
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points */}
      <Points
        ref={ref}
        positions={new Float32Array(sphere)}
        stride={3}
        frustumCulled
        {...props}
      >
        {/* Each point material */}
        <PointMaterial
          transparent
          color="#000000"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Stars Canvas
const StarsCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};


export default StarsCanvas;
