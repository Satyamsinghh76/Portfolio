"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function HologramText() {
  const groupRef = useRef<THREE.Group>(null);
  const ghostRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = 3.2 + Math.sin(t * 0.5) * 0.12;

    if (ghostRef.current) {
      ghostRef.current.position.z = -0.15 + Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3.2, -3]}>
      {/* Primary text */}
      <Text
        fontSize={0.55}
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
          fontSize={0.55}
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
        fontSize={0.15}
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
