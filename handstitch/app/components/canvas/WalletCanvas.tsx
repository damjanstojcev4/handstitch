// cnvas/WalletCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import WalletModel, { WalletConfig } from "./WalletModel";

function ModelAnimator({
  activeView,
  children,
}: {
  activeView: string;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  // Reuse objects (avoid per-frame allocations)
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const yAxis = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  // ========================================
  // 🎯 CAMERA ANGLE CONFIGURATION
  // ========================================
  const targets = useMemo(() => {
    const baseEuler = new THREE.Euler(1.6, 0, 0);
    const qBase = new THREE.Quaternion().setFromEuler(baseEuler);

    // Front view
    const qFront = qBase.clone();

    // Back view
    const qRotBack = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI
    );

    // NOTE: multiply order matters; if back looks wrong, swap order.
    const qBack = qRotBack.clone().multiply(qBase);

    // Detail view
    const qRotDetailY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -0.85
    );
    const qRotDetailX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      0.4
    );
    const qDetail = qRotDetailY.clone().multiply(qRotDetailX).multiply(qBase);

    return { qFront, qBack, qDetail };
  }, []);

  // ========================================
  // 🔄 ANIMATION LOGIC
  // ========================================
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    targetPos.set(0, 0, 0);
    let targetQuat = targets.qFront;

    if (activeView === "back") {
      targetQuat = targets.qBack;
    } else if (activeView === "detail") {
      targetPos.z = 0.9;
      targetPos.x = -0.15;
      targetQuat = targets.qDetail;
    } else if (activeView === "360") {
      g.rotateOnWorldAxis(yAxis, delta * 0.6);
      g.position.lerp(targetPos, 0.1);
      return;
    }

    g.position.lerp(targetPos, 0.12);
    g.quaternion.slerp(targetQuat, 0.12);
  });

  return <group ref={group}>{children}</group>;
}

interface WalletCanvasProps {
  activeView: string;
  config: WalletConfig;
}

export default function WalletCanvas({ activeView, config }: WalletCanvasProps) {
  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />

      <directionalLight position={[8, 6, 4]} intensity={1.2} castShadow />

      <directionalLight position={[-4, 1, -3]} intensity={0.2} />

      <directionalLight position={[-2, -1, -6]} intensity={0.6} />

      <Environment preset="city" environmentIntensity={0.4} />

      <Suspense fallback={null}>
        <ModelAnimator activeView={activeView}>
          <WalletModel config={config} />
        </ModelAnimator>

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.1}
          scale={5}
          blur={3}
          far={4}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={0.5}
        maxPolarAngle={2.5}
        rotateSpeed={0.7}
      />
    </Canvas>
  );
}
