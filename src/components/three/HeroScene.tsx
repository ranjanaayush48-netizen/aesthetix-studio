import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CameraRig } from './CameraRig';
import { SceneLighting } from './SceneLighting';
import { Browser3D } from './Browser3D';
import { FloatingPanel } from './FloatingPanel';

gsap.registerPlugin(ScrollTrigger);

function SceneContent() {
  const sceneRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scroll-based rotation and transition
    const ctx = gsap.context(() => {
      gsap.to(sceneRef.current!.rotation, {
        y: Math.PI * 0.2,
        x: -Math.PI * 0.1,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(sceneRef.current!.position, {
        z: -2,
        y: -1,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={sceneRef}>
      <Browser3D 
        position={[0, 0, 0]} 
        rotation={[0, -0.2, 0]} 
      />
      <FloatingPanel 
        position={[-2, 1, -1]} 
        rotation={[0, 0.3, 0]} 
        size={[0.8, 1.2]} 
        speed={0.8}
      />
      <FloatingPanel 
        position={[2, -0.8, -0.5]} 
        rotation={[0, -0.4, 0]} 
        size={[1.2, 0.6]} 
        color="#EAE2D6"
        speed={1.2}
        offset={1}
      />
      <FloatingPanel 
        position={[0, -1.8, -2]} 
        rotation={[0.2, 0, 0.1]} 
        size={[5, 0.2]} 
        speed={0.5}
      />
    </group>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-brand-beige/10">
        <div className="p-8 rounded-3xl bg-brand-offwhite border border-brand-grey shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-olive/10 mx-auto flex items-center justify-center text-brand-olive mb-4 font-display font-bold text-xl">A</div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Aesthetix Studio Experience</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-screen">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-brand-olive/30">Initiating 3D...</div>}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <CameraRig />
          <SceneLighting />
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}
