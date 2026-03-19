"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "../InteractiveObject";

export default function ProjectGlobe() {
  const globeRef = useRef<THREE.Group>(null);

  // Single Points object instead of 40 individual mesh nodes
  const dotPositions = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 0.82;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <InteractiveObject
      projectId="travel-planner"
      label="Travel Planner — Smart Itineraries"
      position={[2.8, -0.3, -2.5]}
      glowColor="#a78bfa"
    >
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.7}>
        <group ref={globeRef} scale={0.75}>
          {/* Wireframe sphere — reduced segments */}
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.2} toneMapped={false} />
          </mesh>

          {/* Equator ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.82, 0.008, 6, 48]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} toneMapped={false} />
          </mesh>

          {/* Tilted ring */}
          <mesh rotation={[Math.PI / 3, 0.4, 0]}>
            <torusGeometry args={[0.85, 0.006, 6, 48]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.3} toneMapped={false} />
          </mesh>

          {/* City dots — single draw call */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.04}
              color="#a78bfa"
              transparent
              opacity={0.7}
              sizeAttenuation
              depthWrite={false}
            />
          </points>
        </group>
      </Float>
    </InteractiveObject>
  );
}
