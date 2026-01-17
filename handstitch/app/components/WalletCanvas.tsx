"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import WalletModel from "./WalletModel";

export default function WalletCanvas() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 2.5], fov: 45 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 3]} intensity={2.5} />

      <Suspense fallback={null}>
        <WalletModel />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
