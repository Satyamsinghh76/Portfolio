"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "../InteractiveObject";

export default function ProjectShield() {
  const shieldRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shieldRef.current) {
      shieldRef.current.rotation.y = t * 0.2;
      shieldRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.2;
      wireRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.6;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <InteractiveObject
      projectId="fraud-detection"
      label="Fraud Detection — ML System"
      position={[2, -2, -2]}
      glowColor="#f87171"
    >
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
        <group scale={0.65}>
          {/* Solid octahedron core */}
          <mesh ref={shieldRef}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#f87171"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Wireframe overlay */}
          <mesh ref={wireRef}>
            <octahedronGeometry args={[0.75, 0]} />
            <meshBasicMaterial
              color="#f87171"
              wireframe
              transparent
              opacity={0.4}
              toneMapped={false}
            />
          </mesh>

          {/* Scanning ring */}
          <mesh ref={ringRef}>
            <torusGeometry args={[1.1, 0.015, 6, 48]} />
            <meshBasicMaterial
              color="#f87171"
              transparent
              opacity={0.5}
              toneMapped={false}
            />
          </mesh>

          {/* Second ring (perpendicular) */}
          <mesh
            ref={(el) => {
              if (el) {
                el.rotation.y = Math.PI / 2;
              }
            }}
          >
            <torusGeometry args={[1, 0.01, 6, 48]} />
            <meshBasicMaterial
              color="#fca5a5"
              transparent
              opacity={0.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>
    </InteractiveObject>
  );
}
