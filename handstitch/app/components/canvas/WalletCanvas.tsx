"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import WalletModel, { WalletConfig } from "@/app/components/canvas/WalletModel";

function ModelAnimator({
  activeView,
  children,
}: {
  activeView: string;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  // ========================================
  // 🎯 CAMERA ANGLE CONFIGURATION
  // ========================================
  // Adjust these values to change how the wallet appears in different views
  const targets = useMemo(() => {
    // Base tilt angle - controls the initial downward tilt of the wallet
    // Increase X value for more tilt, decrease for less tilt
    // Example: (0.3, 0, 0) = slight tilt, (1.4, 0, 0) = moderate tilt
    const baseEuler = new THREE.Euler(1.6, 0, 0); // ⬅️ CHANGE THIS for base tilt
    const qBase = new THREE.Quaternion().setFromEuler(baseEuler);

    // Front view - shows the wallet from the front
    const qFront = qBase.clone();

    // Back view - rotates 180° to show the back of the wallet
    const qRotBack = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI
    );
    const qBack = qRotBack.multiply(qBase);

    // Detail view - DRAMATIC angle for cinematic product showcase
    // Y-axis rotation: negative = left, positive = right
    const qRotDetailY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -0.85 // ⬅️ CHANGE THIS for left/right rotation (more negative = more left)
    );
    // X-axis rotation for additional downward tilt
    const qRotDetailX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      0.4 // ⬅️ CHANGE THIS for extra downward tilt (positive = tilt down)
    );
    const qDetail = qRotDetailY.multiply(qRotDetailX).multiply(qBase);

    return { qFront, qBack, qDetail };
  }, []);

  // ========================================
  // 🔄 ANIMATION LOGIC
  // ========================================
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const targetPos = new THREE.Vector3(0, 0, 0);
    let targetQuat = targets.qFront;

    if (activeView === "back") {
      targetQuat = targets.qBack;
    } else if (activeView === "detail") {
      // DRAMATIC zoom - get up close and personal with the product
      targetPos.z = 0.9; // ⬅️ CHANGE THIS for detail zoom level (dramatic close-up)
      targetPos.x = -0.15; // ⬅️ Slight offset for dynamic composition
      targetQuat = targets.qDetail;
    } else if (activeView === "360") {
      // Auto-rotation speed - increase multiplier for faster rotation
      g.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), delta * 0.6); // ⬅️ CHANGE 0.6 for rotation speed
      g.position.lerp(targetPos, 0.1);
      return;
    }

    // Animation smoothness - lower = slower/smoother, higher = faster/snappier
    g.position.lerp(targetPos, 0.12); // ⬅️ CHANGE THIS for position animation speed
    g.quaternion.slerp(targetQuat, 0.12); // ⬅️ CHANGE THIS for rotation animation speed
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
      // ========================================
      // 📷 CAMERA SETTINGS
      // ========================================
      // position: [x, y, z] - camera position in 3D space
      //   - Increase Z to move camera further away
      //   - Adjust Y to move camera up/down
      camera={{
        position: [0, 0, 3.5], // ⬅️ CHANGE THIS for camera distance (default was 2.5)
        fov: 50 // ⬅️ CHANGE THIS for field of view (35-75 recommended)
      }}
    >
      {/* ========================================
          💡 LIGHTING CONFIGURATION
          ======================================== */}

      {/* Ambient light - provides overall base illumination */}
      {/* Increase intensity for brighter overall lighting (0-2 range) */}
      <ambientLight intensity={0.5} /> {/* ⬅️ CHANGE THIS for base brightness (middle ground) */}

      {/* Directional light from top-front - simulates sunlight */}
      {/* Position: [x, y, z] where light is coming from */}
      <directionalLight
        position={[8, 6, 4]} // ⬅️ CHANGE THIS for main light direction (more dramatic angle)
        intensity={1.2} // ⬅️ CHANGE THIS for main light brightness (finding a balance)
        castShadow
      />

      {/* Fill light from the side - reduces harsh shadows */}
      <directionalLight
        position={[-4, 1, -3]} // ⬅️ CHANGE THIS for fill light direction
        intensity={0.2} // ⬅️ CHANGE THIS for fill light brightness (subtle fill)
      />

      {/* Rim light from behind - adds depth and highlights edges */}
      <directionalLight
        position={[-2, -1, -6]} // ⬅️ CHANGE THIS for rim light direction
        intensity={0.6} // ⬅️ CHANGE THIS for rim light brightness (clearer edges)
      />

      {/* Environment preset - provides realistic reflections */}
      {/* Options: "apartment", "city", "dawn", "forest", "lobby", 
          "night", "park", "studio", "sunset", "warehouse" */}
      <Environment preset="city" environmentIntensity={0.4} /> {/* ⬅️ CHANGE THIS for reflection character and overall fill */}

      <Suspense fallback={null}>
        <ModelAnimator activeView={activeView}>
          <WalletModel config={config} />
        </ModelAnimator>

        {/* ========================================
            🌑 SHADOW CONFIGURATION
            ======================================== */}
        <ContactShadows
          position={[0, -0.8, 0]} // ⬅️ CHANGE Y value to move shadow up/down
          opacity={0.1} // ⬅️ CHANGE THIS for shadow darkness (increased for drama)
          scale={5} // ⬅️ CHANGE THIS for shadow size
          blur={3} // ⬅️ CHANGE THIS for shadow softness (softer for cinematic feel)
          far={4}
        />
      </Suspense>

      {/* ========================================
          🎮 ORBIT CONTROLS CONFIGURATION
          ======================================== */}
      <OrbitControls
        enablePan={false} // ⬅️ CHANGE to true to allow panning
        enableZoom={false} // ⬅️ CHANGE to true to allow zooming
        enableRotate={true} // ⬅️ CHANGE to false to disable rotation
        enableDamping={true} // Smooth camera movement
        dampingFactor={0.05} // ⬅️ CHANGE THIS for smoother/snappier controls
        minPolarAngle={0.5} // ⬅️ CHANGE THIS for minimum vertical rotation
        maxPolarAngle={2.5} // ⬅️ CHANGE THIS for maximum vertical rotation
        rotateSpeed={0.7} // ⬅️ CHANGE THIS for rotation sensitivity
      />
    </Canvas>
  );
}
