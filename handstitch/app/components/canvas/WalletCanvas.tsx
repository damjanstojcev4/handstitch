"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Vector3 } from "three";
import WalletModel from "@/app/components/canvas/WalletModel";
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
        // Reset position and other axes
        group.current.position.lerp(targetPos, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.1);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.1);
        return;
    }

    // Handle transition from 360 (large rotation values)
    // Normalize current rotation to be within -PI to PI relative to target
    // for smoother shortest-path interpolation
    if (activeView !== '360') {
      // This simple modulo logic helps keep it from spinning 50 times
      // However, simple Euler lerp is still risky.
      // A better quick fix for the "spin like crazy" bug:
      // If we are way off, snap or just modulo.

      const currentY = group.current.rotation.y % (Math.PI * 2);
      group.current.rotation.y = currentY;
    }

    // Smooth transition
    group.current.position.lerp(targetPos, 0.1);

    // Euler Lerp with shortest path logic for Y axis
    let diff = targetRot.y - group.current.rotation.y;
    // Normalize diff to -PI to +PI
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRot.x, 0.1);
    // Apply the shortest path difference
    group.current.rotation.y += diff * 0.1;
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
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 5, -5]} intensity={1} />

      <Suspense fallback={null}>
        <ModelAnimator activeView={activeView}>
          <WalletModel />
        </ModelAnimator>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false} // Disable zoom to prevent scroll issues on page
        enableRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
