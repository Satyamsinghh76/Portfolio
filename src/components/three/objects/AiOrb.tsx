"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AiOrbProps {
  reduced?: boolean;
}

export default function AiOrb({ reduced = false }: AiOrbProps) {
  const orbRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef.current) {
      orbRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.04);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (!reduced && ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.2;
    }
  });

  const segments = reduced ? 16 : 32;
  const ringSegments = reduced ? 32 : 64;

  return (
    <group position={[5.5, 1.8, -3]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.4, segments, segments]} />
        <MeshDistortMaterial
          color="#818cf8"
          roughness={0.1}
          metalness={0.9}
          distort={reduced ? 0.1 : 0.2}
          speed={reduced ? 1 : 2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {!reduced && (
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      )}

      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.65, 0.012, 8, ringSegments]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {!reduced && (
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.55, 0.008, 8, ringSegments]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      )}

      <pointLight intensity={reduced ? 1 : 2} distance={5} color="#818cf8" decay={2} />
    </group>
  );
}
