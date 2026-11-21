"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FireflyField({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions, scales, and phase shifts for fireflies
  const [positions, phases, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across Tripura hills backdrop
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 18 - 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

      ph[i] = Math.random() * Math.PI * 2;
      sc[i] = Math.random() * 0.8 + 0.4;
    }

    return [pos, ph, sc];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const posArr = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Drifting motion mimicking Northeast Indian fireflies in the night sky
      const idx = i * 3;
      posArr[idx] += Math.sin(time * 0.5 + phases[i]) * 0.015;
      posArr[idx + 1] += Math.cos(time * 0.7 + phases[i]) * 0.012;
      posArr[idx + 2] += Math.sin(time * 0.3 + phases[i]) * 0.008;

      // Wrap around bounds
      if (posArr[idx] > 20) posArr[idx] = -20;
      if (posArr[idx] < -20) posArr[idx] = 20;
      if (posArr[idx + 1] > 10) posArr[idx + 1] = -8;
      if (posArr[idx + 1] < -8) posArr[idx + 1] = 10;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#22D3EE"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
