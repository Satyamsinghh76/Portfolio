"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SkillNodes() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) outerRef.current.rotation.y = t * 0.18;
    if (innerRef.current) innerRef.current.rotation.y = -t * 0.3;
  });

  const outerCount = 6;
  const innerCount = 4;
  const outerRadius = 1.3;
  const innerRadius = 0.65;

  return (
    <group position={[3.8, -1.8, -3.5]}>
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      <pointLight intensity={0.8} distance={3} color="#c084fc" decay={2} />

      {/* Ring guides — reduced segments */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[outerRadius, 0.005, 4, 32]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.15} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[innerRadius, 0.004, 4, 24]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} toneMapped={false} />
      </mesh>

      {/* Outer nodes — reduced sphere segments */}
      <group ref={outerRef}>
        {Array.from({ length: outerCount }).map((_, i) => {
          const angle = (i / outerCount) * Math.PI * 2;
          return (
            <mesh
              key={`o-${i}`}
              position={[
                Math.cos(angle) * outerRadius,
                Math.sin(angle * 2) * 0.2,
                Math.sin(angle) * outerRadius,
              ]}
            >
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.5} />
            </mesh>
          );
        })}
      </group>

      {/* Inner nodes */}
      <group ref={innerRef}>
        {Array.from({ length: innerCount }).map((_, i) => {
          const angle = (i / innerCount) * Math.PI * 2;
          return (
            <mesh
              key={`i-${i}`}
              position={[
                Math.cos(angle) * innerRadius,
                Math.sin(angle * 3) * 0.15,
                Math.sin(angle) * innerRadius,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.4} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
