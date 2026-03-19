"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Subtly moves the camera based on mouse position.
 * Creates a parallax depth feel — objects at different Z depths
 * appear to shift at different rates.
 */
export default function MouseCamera() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));
  const mouse = useRef({ x: 0, y: 0 });

  // Capture pointer on the window so it works even when
  // the canvas has pointerEvents: "none"
  useFrame(({ pointer }) => {
    // pointer is normalized -1 to 1
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;

    // Target: offset camera position based on mouse, with limits
    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      mouse.current.x * 1.2,
      0.02
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      mouse.current.y * 0.8,
      0.02
    );

    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
