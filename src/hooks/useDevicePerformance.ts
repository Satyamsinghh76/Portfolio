"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "high" | "mid" | "low";

interface DeviceProfile {
  tier: PerformanceTier;
  isMobile: boolean;
  dpr: [number, number];
  reducedMotion: boolean;
}

const DEFAULT: DeviceProfile = {
  tier: "high",
  isMobile: false,
  dpr: [1, 1.5],
  reducedMotion: false,
};

export function useDevicePerformance(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // GPU heuristics
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    let gpuTier: PerformanceTier = "mid";

    if (gl && gl instanceof WebGLRenderingContext) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
        : "";

      const isLowGpu =
        /intel|mali-4|mali-t6|adreno [23]\d{2}|powervr|swiftshader/i.test(renderer);
      const isHighGpu =
        /nvidia|geforce|radeon rx|apple m[1-9]|adreno [6-9]\d{2}/i.test(renderer);

      if (isLowGpu || (isMobile && !isHighGpu)) {
        gpuTier = "low";
      } else if (isHighGpu && !isMobile) {
        gpuTier = "high";
      }

      // Additional: check max texture size as proxy
      const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      if (maxTexture < 4096) gpuTier = "low";
    } else {
      gpuTier = "low"; // No WebGL = definitely low
    }

    // Hardware concurrency check
    const cores = navigator.hardwareConcurrency || 2;
    if (cores <= 2 && gpuTier !== "high") gpuTier = "low";

    // Memory check (Chrome only)
    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    if (memory && memory <= 2) gpuTier = "low";

    const dpr: [number, number] =
      gpuTier === "low" ? [1, 1] : gpuTier === "mid" ? [1, 1.5] : [1, 2];

    setProfile({
      tier: gpuTier,
      isMobile,
      dpr,
      reducedMotion,
    });
  }, []);

  return profile;
}
