import { useRef } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Browser3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function Browser3D({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: Browser3DProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating motion
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* Browser Frame */}
      <RoundedBox
        args={[3.5, 2.2, 0.08]}
        radius={0.1}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#EAE2D6" roughness={0.1} metalness={0.05} />
      </RoundedBox>

      {/* Browser Header/ToolBar */}
      <mesh position={[0, 0.9, 0.05]}>
        <planeGeometry args={[3.3, 0.2]} />
        <meshStandardMaterial color="#EEEEEE" />
        
        {/* Buttons */}
        <mesh position={[-1.5, 0, 0.01]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#8B9A6E" opacity={0.6} transparent />
        </mesh>
        <mesh position={[-1.4, 0, 0.01]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#8B9A6E" opacity={0.4} transparent />
        </mesh>
      </mesh>

      {/* Abstract Content Blocks */}
      <group position={[0, -0.1, 0.05]}>
        {/* Hero Area */}
        <mesh position={[-0.8, 0.4, 0]}>
          <planeGeometry args={[1.2, 0.5]} />
          <meshStandardMaterial color="#8B9A6E" opacity={0.2} transparent />
        </mesh>
        
        {/* Text Blocks */}
        <mesh position={[-0.8, 0, 0]}>
          <planeGeometry args={[1.2, 0.05]} />
          <meshStandardMaterial color="#8B9A6E" opacity={0.15} transparent />
        </mesh>
        <mesh position={[-1.0, -0.1, 0]}>
          <planeGeometry args={[0.8, 0.05]} />
          <meshStandardMaterial color="#8B9A6E" opacity={0.15} transparent />
        </mesh>

        {/* Image Grid Placeholder */}
        <group position={[0.8, 0.1, 0]}>
           <mesh position={[0, 0.3, 0]}>
            <planeGeometry args={[0.8, 0.7]} />
            <meshStandardMaterial color="#EEEEEE" />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <planeGeometry args={[0.8, 0.2]} />
            <meshStandardMaterial color="#8B9A6E" opacity={0.1} transparent />
          </mesh>
        </group>
      </group>
    </group>
  );
}
