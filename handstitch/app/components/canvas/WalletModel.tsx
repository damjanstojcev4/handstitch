"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import type { Option, OptionValue, SelectionState } from "@/app/components/canvas/types";

type Props = {
  glbUrl: string;
  options: Option[];
  selections: SelectionState;
};

export default function WalletModel({ glbUrl, options, selections }: Props) {
  const { scene } = useGLTF(glbUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    // Build a map: option_id → { option, selectedValue }
    const selectionMap = new Map<number, { option: Option; value: OptionValue | null }>();
    options.forEach((opt) => {
      selectionMap.set(opt.id, {
        option: opt,
        value: selections[opt.id] ?? null,
      });
    });

    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Object3D)) return;

      // Find which option controls this object (by option_key === object name)
      const entry = [...selectionMap.values()].find(
        (e) => e.option.option_key === obj.name
      );

      if (!entry) return; // Not a controlled mesh, leave as-is

      const { option, value } = entry;

      // Required meshes (BACK_PANEL) are always visible
      // Optional meshes are visible only if a value is selected
      const shouldBeVisible = option.is_required ? true : value !== null;

      obj.visible = shouldBeVisible;
      if (!shouldBeVisible) return;

      // Apply color: traverse children to find actual meshes
      obj.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        const newMaterials = materials.map((mat: THREE.Material) => {
          // Find which value targets this material slot by mesh_variant name
          // If a specific value is selected, apply its color to the matching slot
          // If mesh has only one material slot, just apply selected color
          if (!value) return mat;

          const targetVariant = value.mesh_variant; // e.g. "BLACK_LEATHER"
          const matName = mat.name?.toUpperCase() ?? "";

          // Match by name OR single-slot fallback
          const isMatch = matName === targetVariant || materials.length === 1;

          if (isMatch && mat instanceof THREE.MeshStandardMaterial) {
            const clonedMat = mat.clone();
            clonedMat.color = new THREE.Color(value.material_color_code);
            clonedMat.needsUpdate = true;
            return clonedMat;
          }

          return mat;
        });

        child.material = newMaterials.length === 1 ? newMaterials[0] : newMaterials;
      });
    });
  }, [cloned, options, selections]);

  return (
    <primitive
      object={cloned}
      rotation={[Math.PI, 0, 0]}
    />
  );
}
