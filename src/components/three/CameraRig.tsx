import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export function CameraRig() {
  useFrame((state) => {
    // Subtle cursor following (Lerped)
    const { x, y } = state.mouse;
    
    // Desktop interaction
    if (window.innerWidth > 768) {
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        x * 1,
        0.05
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        y * 0.5,
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
