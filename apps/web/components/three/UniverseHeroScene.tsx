"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { FireflyField } from "./FireflyField";
import { LightweightUniverseFallback } from "./LightweightUniverseFallback";

// Tech stack items in the orbit
const ORBIT_ITEMS = [
  { name: "Python", color: "#3B82F6", pos: [4, 1, 0] },
  { name: "JavaScript", color: "#F59E0B", pos: [2.8, 2.8, 0] },
  { name: "Gemini AI", color: "#22D3EE", pos: [0, 4, 0] },
  { name: "Next.js", color: "#FFFFFF", pos: [-2.8, 2.8, 0] },
  { name: "React", color: "#61DAFB", pos: [-4, 1, 0] },
  { name: "MongoDB", color: "#10B981", pos: [-2.8, -2.8, 0] },
  { name: "PHP", color: "#8892BF", pos: [0, -4, 0] },
  { name: "HTML/CSS", color: "#E879F9", pos: [2.8, -2.8, 0] },
];

// Floating code glyphs
const CODE_GLYPHS = [
  { char: "</>", pos: [-5, 3, -4] as [number, number, number], rot: [0.1, 0.2, 0] },
  { char: "{ }", pos: [5.5, 2.5, -3] as [number, number, number], rot: [-0.2, 0.1, 0.3] },
  { char: "=>", pos: [-4.5, -2, -2] as [number, number, number], rot: [0.1, -0.3, 0.2] },
  { char: "async", pos: [4.8, -3, -4] as [number, number, number], rot: [-0.1, 0.2, -0.1] },
  { char: "def", pos: [0, 4.5, -5] as [number, number, number], rot: [0, 0, 0.1] },
];

function OrbitingRing() {
  const ringGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ringGroupRef.current) return;
    const t = clock.getElapsedTime() * 0.15;
    ringGroupRef.current.rotation.z = t;
    ringGroupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.3;
  });

  return (
    <group ref={ringGroupRef}>
      {/* Central ring wireframe */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.3} />
      </mesh>

      {ORBIT_ITEMS.map((item, i) => {
        const angle = (i / ORBIT_ITEMS.length) * Math.PI * 2;
        const radius = 4.2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <group key={item.name} position={[x, y, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <Text
              position={[0, 0.45, 0]}
              fontSize={0.22}
              color="#F5F5FA"
              anchorX="center"
              anchorY="middle"
            >
              {item.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function TripuraHills() {
  const hillsRef = useRef<THREE.Mesh>(null);

  return (
    <group position={[0, -5, -8]}>
      {/* Distant Hills Mesh */}
      <mesh ref={hillsRef} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[50, 20, 32, 32]} />
        <meshStandardMaterial
          color="#071512"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function FloatingGlyphs() {
  return (
    <group>
      {CODE_GLYPHS.map((g, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
          <Text
            position={g.pos}
            fontSize={0.65}
            color="#22D3EE"
            fillOpacity={0.6}
            anchorX="center"
            anchorY="middle"
          >
            {g.char}
          </Text>
        </Float>
      ))}
    </group>
  );
}

function SceneContents({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth camera / universe parallax response
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.15,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.12,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#7C3AED" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#22D3EE" />

      <OrbitingRing />
      <FloatingGlyphs />
      <FireflyField count={90} />
      <TripuraHills />
    </group>
  );
}

export function UniverseHeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Detect reduced motion or low-power device
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) {
      setIsLowEnd(true);
    }

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hasWebGL || isLowEnd) {
    return <LightweightUniverseFallback />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <SceneContents mouse={mouse} />
      </Canvas>
    </div>
  );
}
