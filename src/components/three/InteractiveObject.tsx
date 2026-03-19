"use client";

import { useRef, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { selectProject } from "@/lib/scene-store";

interface InteractiveObjectProps {
  children: ReactNode;
  projectId: string;
  label: string;
  position?: [number, number, number];
  labelOffset?: [number, number, number];
  glowColor?: string;
}

export default function InteractiveObject({
  children,
  projectId,
  label,
  position = [0, 0, 0],
  labelOffset = [0, -1.5, 0],
  glowColor = "#818cf8",
}: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current || !glowRef.current) return;

    const target = hovered ? 1.12 : 1;
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.08);
    groupRef.current.scale.setScalar(s);

    glowRef.current.intensity = THREE.MathUtils.lerp(
      glowRef.current.intensity,
      hovered ? 3 : 0,
      0.08
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectProject(projectId);
      }}
    >
      {children}
      <pointLight
        ref={glowRef}
        intensity={0}
        distance={4}
        color={glowColor}
        decay={2}
      />
      {hovered && (
        <Html
          center
          position={labelOffset}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-4 py-1.5 text-[11px] font-medium text-white backdrop-blur-xl">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
