"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "../InteractiveObject";

export default function ProjectPanel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      -0.2 + Math.sin(clock.getElapsedTime() * 0.25) * 0.1;
  });

  const barHeights = [0.4, 0.65, 0.5, 0.8, 0.35, 0.6];

  return (
    <InteractiveObject
      projectId="spendsense"
      label="SpendSense — Finance Tracker"
      position={[0.5, -0.5, -3]}
      glowColor="#34d399"
    >
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.6}>
        <group ref={groupRef} scale={0.75}>
          {/* Glass panel */}
          <mesh>
            <planeGeometry args={[2, 1.5]} />
            <meshStandardMaterial
              color="#111113"
              transparent
              opacity={0.4}
              metalness={0.5}
              roughness={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Panel border */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.05, 1.55]} />
            <meshBasicMaterial
              color="#34d399"
              transparent
              opacity={0.08}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Bar chart */}
          {barHeights.map((h, i) => (
            <mesh
              key={i}
              position={[-0.65 + i * 0.26, -0.55 + h / 2, 0.01]}
            >
              <boxGeometry args={[0.14, h, 0.02]} />
              <meshBasicMaterial
                color="#34d399"
                transparent
                opacity={0.5 + (h / 0.8) * 0.3}
                toneMapped={false}
              />
            </mesh>
          ))}

          {/* Horizontal reference line */}
          <mesh position={[0, 0.1, 0.02]}>
            <planeGeometry args={[1.7, 0.005]} />
            <meshBasicMaterial
              color="#34d399"
              transparent
              opacity={0.3}
              toneMapped={false}
            />
          </mesh>

          {/* Title bar accent */}
          <mesh position={[-0.6, 0.6, 0.01]}>
            <planeGeometry args={[0.3, 0.04]} />
            <meshBasicMaterial
              color="#34d399"
              transparent
              opacity={0.6}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>
    </InteractiveObject>
  );
}
