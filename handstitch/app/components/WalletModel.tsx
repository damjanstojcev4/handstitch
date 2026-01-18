"use client";

import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useEffect } from "react";

export default function WalletModel() {
  const { scene } = useGLTF("/models/teapot_GLB.glb");

  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);

    const maxAxis = Math.max(size.x, size.y, size.z);

    // Normalize model
    const normalizeScale = 1 / maxAxis;

    // Desired visual size (tweak this number)
    const desiredSize = 1.2;

    scene.scale.setScalar(normalizeScale * desiredSize);

    // Center model
    const center = new Vector3();
    box.getCenter(center);
    scene.position.sub(center);
    scene.position.y -= 0.3;
    scene.rotation.set(0, 0, 0);
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/teapot_GLB.glb");
