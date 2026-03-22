"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface HologramTextProps {
  isMobile?: boolean;
}

export default function HologramText({ isMobile = false }: HologramTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ghostRef = useRef<THREE.Group>(null);

  // Mobile: shift to center-top, desktop: right side
  const baseX = isMobile ? 0 : 3;
  const baseY = isMobile ? 2.5 : 3.2;
  const baseZ = isMobile ? -1 : -3;
  const fontSize = isMobile ? 0.4 : 0.55;
  const subSize = isMobile ? 0.1 : 0.15;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = baseY + Math.sin(t * 0.5) * 0.12;
    groupRef.current.position.x = baseX;

    if (ghostRef.current) {
      ghostRef.current.position.z = -0.15 + Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, baseZ]}>
      {/* Primary text */}
      <Text
        fontSize={fontSize}
        letterSpacing={0.15}
        anchorX="center"
        anchorY="middle"
      >
        SATYAM SINGH
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </Text>

      {/* Ghost layer for hologram depth */}
      <group ref={ghostRef}>
        <Text
          fontSize={fontSize}
          letterSpacing={0.15}
          position={[0, 0, -0.12]}
          anchorX="center"
          anchorY="middle"
        >
          SATYAM SINGH
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.2}
            toneMapped={false}
          />
        </Text>
      </group>

      {/* Subtitle */}
      <Text
        fontSize={subSize}
        letterSpacing={0.3}
        position={[0, -0.45, 0]}
        anchorX="center"
        anchorY="middle"
      >
        SOFTWARE DEVELOPER
        <meshBasicMaterial
          color="#71717a"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </Text>

      {/* Glow */}
      <pointLight intensity={1.5} distance={6} color="#818cf8" decay={2} />
    </group>
  );
}
