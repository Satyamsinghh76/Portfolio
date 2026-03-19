"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import InteractiveObject from "../InteractiveObject";

export default function ProjectFrame() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      0.15 + Math.sin(clock.getElapsedTime() * 0.2) * 0.12;
  });

  const frameW = 1.3;
  const frameH = 1;
  const thickness = 0.06;
  const depth = 0.04;

  return (
    <InteractiveObject
      projectId="memory-gallery"
      label="Memory Gallery — Visual Timeline"
      position={[5.5, 1.8, -3]}
      glowColor="#f472b6"
    >
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.9}>
        <group ref={groupRef} scale={0.7}>
          {/* Frame sides */}
          {/* Top */}
          <mesh position={[0, frameH / 2, 0]}>
            <boxGeometry args={[frameW + thickness, thickness, depth]} />
            <meshStandardMaterial
              color="#27272a"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
          {/* Bottom */}
          <mesh position={[0, -frameH / 2, 0]}>
            <boxGeometry args={[frameW + thickness, thickness, depth]} />
            <meshStandardMaterial
              color="#27272a"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
          {/* Left */}
          <mesh position={[-frameW / 2, 0, 0]}>
            <boxGeometry args={[thickness, frameH, depth]} />
            <meshStandardMaterial
              color="#27272a"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
          {/* Right */}
          <mesh position={[frameW / 2, 0, 0]}>
            <boxGeometry args={[thickness, frameH, depth]} />
            <meshStandardMaterial
              color="#27272a"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Photo surface (glowing) */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[frameW - thickness, frameH - thickness]} />
            <meshBasicMaterial
              color="#f472b6"
              transparent
              opacity={0.1}
              toneMapped={false}
            />
          </mesh>

          {/* Horizontal composition lines */}
          {[-0.15, 0.15].map((y) => (
            <mesh key={y} position={[0, y, 0.005]}>
              <planeGeometry args={[frameW - thickness * 2, 0.003]} />
              <meshBasicMaterial
                color="#f472b6"
                transparent
                opacity={0.25}
                toneMapped={false}
              />
            </mesh>
          ))}

          {/* Corner accents */}
          {[
            [-0.5, 0.35],
            [0.5, 0.35],
            [-0.5, -0.35],
            [0.5, -0.35],
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.01]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial
                color="#f472b6"
                transparent
                opacity={0.6}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </InteractiveObject>
  );
}
