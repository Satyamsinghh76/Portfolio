"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { Suspense, useState, useCallback } from "react";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { useResponsive } from "@/hooks/useResponsive";
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
  const { tier, dpr, isMobile: perfMobile } = useDevicePerformance();
  const { fov, cameraZ, sceneScale, isMobile, isTablet } = useResponsive();
  const [degraded, setDegraded] = useState(false);

  const handleDecline = useCallback(() => setDegraded(true), []);

  const showFull = tier === "high" && !degraded;
  const showEnvironment = !perfMobile && !isMobile && !degraded;
  const mobile = perfMobile || isMobile;

  // Clamp DPR to max 2 for Retina, min 1 for low-end
  const clampedDpr: [number, number] = [
    Math.max(dpr[0], 1),
    Math.min(dpr[1], 2),
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov }}
      dpr={clampedDpr}
      gl={{
        antialias: tier === "high" && !isMobile,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: "auto", touchAction: "none" }}
      frameloop="always"
      flat={tier !== "high"}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 100 } }}
    >
      <fog attach="fog" args={["#09090b", 8, 28]} />

      <PerformanceMonitor
        onDecline={handleDecline}
        flipflops={2}
        factor={0.5}
      />
      <AdaptiveDpr pixelated />

      {!mobile && <MouseCamera />}
      <Lighting reduced={tier !== "high" || degraded || isMobile} />

      <Suspense fallback={null}>
        {/* Scale everything based on viewport */}
        <group scale={sceneScale}>
          {/* Center — always visible */}
          <HologramText isMobile={mobile} />

          {/* Projects — always visible (interactive) */}
          <ProjectLaptop />
          <ProjectPanel />
          <ProjectShield />

          {/* These can be hidden on very small mobile to save GPU */}
          {!mobile && <ProjectGlobe />}
          {!mobile && <ProjectFrame />}

          {/* Show globe/frame on tablet */}
          {isTablet && <ProjectGlobe />}

          {/* Right side — conditional */}
          {showFull && !mobile && <SkillNodes />}

          {/* Environment — skip on mobile/degraded */}
          {showEnvironment && <SceneEnvironment />}
        </group>

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
