"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "../InteractiveObject";

export default function ProjectLaptop() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
  });

  return (
    <InteractiveObject
      projectId="bookflow"
      label="BookFlow — SaaS Booking"
      position={[1, 1.2, -1.5]}
      glowColor="#60a5fa"
    >
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.8}>
        <group ref={groupRef} scale={0.8}>
          {/* Base / keyboard */}
          <mesh position={[0, 0, 0.1]} rotation={[0.05, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 1]} />
            <meshStandardMaterial
              color="#1e293b"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Screen back */}
          <mesh position={[0, 0.58, -0.35]} rotation={[-0.45, 0, 0]}>
            <boxGeometry args={[1.4, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Screen glow surface */}
          <mesh position={[0, 0.58, -0.33]} rotation={[-0.45, 0, 0]}>
            <planeGeometry args={[1.2, 0.72]} />
            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.15}
              toneMapped={false}
            />
          </mesh>

          {/* Screen UI lines */}
          {[0.2, 0, -0.2].map((y, i) => (
            <mesh
              key={i}
              position={[0, 0.58 + y * 0.7, -0.31]}
              rotation={[-0.45, 0, 0]}
            >
              <planeGeometry args={[0.9, 0.02]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.3 - i * 0.08}
                toneMapped={false}
              />
            </mesh>
          ))}

          {/* Status LED */}
          <mesh position={[0, 0.02, -0.38]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#60a5fa" toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </InteractiveObject>
  );
}
