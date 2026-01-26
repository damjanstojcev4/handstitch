"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/**
 * These MUST match the object names inside your GLB (case-sensitive).
 * If your designer renames anything in Blender, change it here.
 */
const PART_NAMES = {
  // Base anchor / base mesh (not required for toggling, but kept here for clarity)
  BACK_PANEL: "BACK_PANEL",

  // Optional parts you want to toggle via drag & drop:
  CARD_HOLDER_1: "CARD_HOLDER_1",
  CARD_HOLDER_2: "CARD_HOLDER_2",
  CARD_HOLDER_3: "CARD_HOLDER_3",
  CARD_HOLDER_4: "CARD_HOLDER_4",
  MONEY_POCKET: "MONEY_POCKET",
} as const;

export type PartId = "CARD_HOLDER_1" | "CARD_HOLDER_2" | "CARD_HOLDER_3" | "CARD_HOLDER_4" | "MONEY_POCKET";

export type WalletConfig = {
  enabled: Partial<Record<PartId, boolean>>;
};

export default function WalletModel({ config }: { config: WalletConfig }) {
  const base = useGLTF("/models/WALLET.glb");

  // Clone base scene (avoid mutating the shared GLTF scene)
  const baseScene = useMemo(() => base.scene.clone(true), [base.scene]);

  // --- Scale + center once
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(baseScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Center model at origin
    baseScene.position.sub(center);

    // Scale to consistent visual size
    const maxAxis = Math.max(size.x, size.y, size.z);
    const desiredSize = 1.6;
    const scale = desiredSize / (maxAxis || 1);
    baseScene.scale.setScalar(scale);

    // Optional tweak if you want it slightly lower/higher:
    // baseScene.position.y -= 0.15;
  }, [baseScene]);

  /**
   * ✅ Toggle visibility based on config.enabled
   *
   * IMPORTANT:
   * - If a part is not found by name, we warn in console (helps debugging).
   * - Default behavior: parts are hidden unless enabled === true
   */
  useEffect(() => {
    const setVisible = (name: string, visible: boolean) => {
      const obj = baseScene.getObjectByName(name);
      if (!obj) {
        console.warn(
          `[WalletModel] Could not find "${name}" in WALLET.glb. ` +
          `Check the object name in Blender (case-sensitive).`
        );
        return;
      }
      obj.visible = visible;
    };

    // Hide by default unless enabled
    setVisible(PART_NAMES.CARD_HOLDER_1, !!config.enabled.CARD_HOLDER_1);
    setVisible(PART_NAMES.CARD_HOLDER_2, !!config.enabled.CARD_HOLDER_2);
    setVisible(PART_NAMES.CARD_HOLDER_3, !!config.enabled.CARD_HOLDER_3);
    setVisible(PART_NAMES.CARD_HOLDER_4, !!config.enabled.CARD_HOLDER_4);
    setVisible(PART_NAMES.MONEY_POCKET, !!config.enabled.MONEY_POCKET);

    /**
     * Optional: If you want BACK_PANEL always visible (usually yes),
     * you can enforce it here. (Only needed if your model has it separate)
     */
    // setVisible(PART_NAMES.BACK_PANEL, true);
  }, [baseScene, config]);

  return (
    <group>
      <primitive object={baseScene} />
    </group>
  );
}

useGLTF.preload("/models/WALLET.glb");
