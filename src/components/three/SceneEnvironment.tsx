"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 60; // reduced from 80
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#818cf8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function HorizontalRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={ref} position={[0, -3.8, -2]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[5, 0.008, 6, 64]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.06} toneMapped={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[3.5, 0.005, 6, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.04} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function SceneEnvironment() {
  return (
    <>
      <AmbientParticles />
      <HorizontalRings />
    </>
  );
}
