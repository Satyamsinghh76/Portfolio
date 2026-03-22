"use client";

import { useState, useEffect } from "react";

export interface ResponsiveProfile {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  /** Multiplier for 3D object scale (1 = desktop, ~0.6 = mobile) */
  sceneScale: number;
  /** Camera FOV — wider on mobile to fit objects */
  fov: number;
  /** Camera Z position — closer on mobile */
  cameraZ: number;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
}

const getProfile = (): ResponsiveProfile => {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, isDesktop: true, sceneScale: 1, fov: 42, cameraZ: 8, width: 1440, height: 900 };
  }

  const w = window.innerWidth;
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isDesktop = w >= 1024;

  let sceneScale = 1;
  let fov = 42;
  let cameraZ = 8;

  if (isMobile) {
    sceneScale = w < 480 ? 0.5 : 0.6;
    fov = 55;
    cameraZ = 10;
  } else if (isTablet) {
    sceneScale = 0.75;
    fov = 48;
    cameraZ = 9;
  }

  return { isMobile, isTablet, isDesktop, sceneScale, fov, cameraZ, width: w, height: window.innerHeight };
};

export function useResponsive(): ResponsiveProfile {
  const [profile, setProfile] = useState<ResponsiveProfile>(getProfile);

  useEffect(() => {
    const update = () => setProfile(getProfile());
    window.addEventListener("resize", update);
    // Initial calculation
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return profile;
}
