"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Vector3 } from "three";
import WalletModel from "./WalletModel";
import * as THREE from "three";

function ModelAnimator({ activeView, children }: { activeView: string, children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetPos = new Vector3(0, 0, 0);
    const targetRot = new Vector3(0, 0, 0);

    // Determine targets
    switch (activeView) {
      case 'front':
        // Default (0,0,0)
        break;
      case 'back':
        targetRot.y = Math.PI;
        break;
      case 'detail':
        targetPos.z = 1.5; // Move closer to camera
        targetRot.x = 0.2; // Slight tilt
        targetRot.y = -0.2;
        break;
      case '360':
        // Continuous rotation
        group.current.rotation.y += delta * 0.5;
        // Reset position
        group.current.position.lerp(targetPos, 0.1);
        return; // Skip rotation lerp
    }

    // Smooth transition
    group.current.position.lerp(targetPos, 0.1);

    // Simple rotation lerp (good enough for 0 -> PI transitions)
    // For production-grade generic rotations, Quaternions are better, 
    // but here we have controlled inputs.
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRot.x, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRot.y, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRot.z, 0.1);
  });

  return <group ref={group}>{children}</group>;
}

interface WalletCanvasProps {
  activeView: string;
}

export default function WalletCanvas({ activeView }: WalletCanvasProps) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 2.5], fov: 45 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 3]} intensity={2.5} />

      <Suspense fallback={null}>
        <ModelAnimator activeView={activeView}>
          <WalletModel />
        </ModelAnimator>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
