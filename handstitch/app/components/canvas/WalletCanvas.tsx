"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useProgress,
  Center,
} from "@react-three/drei";
import { Suspense } from "react";
import WalletModel from "./WalletModel";
import type { Option, SelectionState } from "@/app/components/canvas/types";

interface Props {
  glbUrl: string;
  options: Option[];
  selections: SelectionState;
}

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 w-56">
        <div className="w-full bg-black/10 h-px rounded-full overflow-hidden">
          <div
            className="bg-black h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-black/50 text-[10px] uppercase tracking-widest">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

export default function WalletCanvas({ glbUrl, options, selections }: Props) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 3], fov: 45 }}
      style={{ background: "white" }}
      shadows
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["white"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[8, 6, 4]} intensity={2.5} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} />

      <Environment preset="city" />

      <Suspense fallback={<CanvasLoader />}>
        <Center>
          <WalletModel
            glbUrl={glbUrl}
            options={options}
            selections={selections}
          />
        </Center>

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.2}
          scale={5}
          blur={3}
        />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
