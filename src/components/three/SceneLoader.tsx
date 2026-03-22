"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="h-32 w-32 rounded-full border border-primary/10 bg-primary/[0.03] sm:h-40 sm:w-40" />
        <div className="absolute inset-4 rounded-full border border-primary/20 bg-primary/[0.05] animate-pulse" />
        <div className="absolute inset-10 rounded-full border border-primary/30 bg-primary/[0.08] animate-pulse [animation-delay:200ms]" />
      </div>
    </div>
  );
}

/** Static CSS-only fallback for devices that can't run WebGL */
function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
      <div className="absolute right-1/4 top-1/2 h-[200px] w-[200px] rounded-full bg-accent/[0.04] blur-[80px] sm:h-[350px] sm:w-[350px] sm:blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 h-[150px] w-[150px] rounded-full bg-primary/[0.03] blur-[60px] sm:h-[250px] sm:w-[250px] sm:blur-[100px]" />
    </div>
  );
}

export default function SceneLoader() {
  const { tier, reducedMotion } = useDevicePerformance();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showWebGL = tier !== "low" && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full overflow-hidden touch-pan-y"
    >
      {showWebGL && isVisible ? <HeroScene /> : <StaticFallback />}
    </div>
  );
}
