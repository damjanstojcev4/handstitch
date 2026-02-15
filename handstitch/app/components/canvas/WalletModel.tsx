// cnvas/WalletModel.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * These MUST match the object names inside your GLB (case-sensitive).
 */
export type PartId =
  | "CARD_HOLDER_1"
  | "CARD_HOLDER_2"
  | "CARD_HOLDER_3"
  | "CARD_HOLDER_4"
  | "MONEY_POCKET";

export type WalletConfig = {
  enabled: Partial<Record<PartId, boolean>>;
};

const TOGGLE_PARTS: PartId[] = [
  "CARD_HOLDER_1",
  "CARD_HOLDER_2",
  "CARD_HOLDER_3",
  "CARD_HOLDER_4",
  "MONEY_POCKET",
];

export default function WalletModel({ config }: { config: WalletConfig }) {
  const gltf = useGLTF("/models/WALLET.glb");

  // Clone scene so we don't mutate shared GLTF scene
  const baseScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Warn-once for missing parts
  const warnedMissing = useRef<Set<string>>(new Set());

  // Scale + center once
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(baseScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    baseScene.position.sub(center);

    const maxAxis = Math.max(size.x, size.y, size.z);
    const desiredSize = 1.6;
    const scale = desiredSize / (maxAxis || 1);
    baseScene.scale.setScalar(scale);
  }, [baseScene]);

  // Toggle visibility
  useEffect(() => {
    for (const id of TOGGLE_PARTS) {
      const obj = baseScene.getObjectByName(id);

      if (!obj) {
        if (!warnedMissing.current.has(id)) {
          warnedMissing.current.add(id);
          console.warn(
            `[WalletModel] Could not find "${id}" in WALLET.glb. Check Blender object name (case-sensitive).`
          );
        }
        continue;
      }

      obj.visible = !!config.enabled[id];
    }
  }, [baseScene, config.enabled]);

  return (
    <group>
      <primitive object={baseScene} />
    </group>
  );
}

useGLTF.preload("/models/WALLET.glb");
