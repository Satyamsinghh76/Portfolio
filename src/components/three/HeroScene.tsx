"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { Suspense, useState, useCallback } from "react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import MouseCamera from "./MouseCamera";
import Lighting from "./Lighting";
import SceneEnvironment from "./SceneEnvironment";
import HologramText from "./objects/HologramText";
import ProjectLaptop from "./objects/ProjectLaptop";
import ProjectPanel from "./objects/ProjectPanel";
import ProjectShield from "./objects/ProjectShield";
import ProjectGlobe from "./objects/ProjectGlobe";
import ProjectFrame from "./objects/ProjectFrame";
import SkillNodes from "./objects/SkillNodes";

export default function HeroScene() {
  const { tier, dpr, isMobile } = useDevicePerformance();
  const [degraded, setDegraded] = useState(false);

  const handleDecline = useCallback(() => setDegraded(true), []);

  // Mid-tier: skip environment particles and one project object
  const showFull = tier === "high" && !degraded;
  const showEnvironment = !isMobile && !degraded;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={dpr}
      gl={{
        antialias: tier === "high",
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: "auto" }}
      frameloop="always"
      flat={tier !== "high"}
    >
      <fog attach="fog" args={["#09090b", 8, 28]} />

      {/* Auto-degrade when FPS drops below 40 */}
      <PerformanceMonitor
        onDecline={handleDecline}
        flipflops={2}
        factor={0.5}
      />
      <AdaptiveDpr pixelated />

      {!isMobile && <MouseCamera />}
      <Lighting reduced={tier !== "high" || degraded} />

      <Suspense fallback={null}>
        {/* Center — always visible */}
        <HologramText />

        {/* Projects — always visible (they're interactive) */}
        <ProjectLaptop />
        <ProjectPanel />
        <ProjectShield />
        <ProjectGlobe />
        <ProjectFrame />

        {/* Right side — conditional */}
        {showFull && <SkillNodes />}

        {/* Environment — skip on mobile/degraded */}
        {showEnvironment && <SceneEnvironment />}

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
