import { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingPanelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  color?: string;
  speed?: number;
  offset?: number;
}

export function FloatingPanel({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  size = [1, 1],
  color = "#8B9A6E",
  speed = 1,
  offset = 0
}: FloatingPanelProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    group.current.position.y = position[1] + Math.sin(t) * 0.2;
    group.current.rotation.z = rotation[2] + Math.cos(t * 0.5) * 0.05;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <RoundedBox
        args={[size[0], size[1], 0.02]}
        radius={0.04}
        castShadow
      >
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.2} 
          roughness={0.2}
          metalness={0.1}
        />
      </RoundedBox>
      
      {/* Inner decorative grid lines */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[size[0] * 0.8, size[1] * 0.8]} />
        <meshBasicMaterial color={color} opacity={0.05} transparent wireframe />
      </mesh>
    </group>
  );
}
