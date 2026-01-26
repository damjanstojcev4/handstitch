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

  const targets = useMemo(() => {
    const baseEuler = new THREE.Euler(1.4, 0, 0);
    const qBase = new THREE.Quaternion().setFromEuler(baseEuler);

    const qFront = qBase.clone();

    const qRotBack = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI
    );
    const qBack = qRotBack.multiply(qBase);

    const qRotDetail = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -0.2
    );
    const qDetail = qRotDetail.multiply(qBase);

    return { qFront, qBack, qDetail };
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    const targetPos = new THREE.Vector3(0, 0, 0);
    let targetQuat = targets.qFront;

    if (activeView === "back") {
      targetQuat = targets.qBack;
    } else if (activeView === "detail") {
      targetPos.z = 0.35;
      targetQuat = targets.qDetail;
    } else if (activeView === "360") {
      g.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), delta * 0.6);
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
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 2.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <ModelAnimator activeView={activeView}>
          <WalletModel config={config} />
        </ModelAnimator>

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.4}
          scale={5}
          blur={2.5}
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
