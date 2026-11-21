"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { LightweightUniverseFallback } from "./LightweightUniverseFallback";

const ORBIT_ITEMS = [
  { name: "Python", color: "#3B82F6" },
  { name: "JavaScript", color: "#F59E0B" },
  { name: "Gemini AI", color: "#22D3EE" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "React", color: "#61DAFB" },
  { name: "MongoDB", color: "#10B981" },
  { name: "PHP", color: "#8892BF" },
  { name: "HTML/CSS", color: "#E879F9" },
];

const CODE_GLYPHS = [
  { char: "</>", pos: [-5.5, 3.2, -3] as const, color: "#22D3EE" },
  { char: "{ }", pos: [5.8, 2.6, -2.5] as const, color: "#7C3AED" },
  { char: "=>", pos: [-4.8, -2.2, -2] as const, color: "#E879F9" },
  { char: "async", pos: [5.2, -3.2, -3] as const, color: "#22D3EE" },
  { char: "def", pos: [0.2, 4.2, -4] as const, color: "#3B82F6" },
];

function createTextSprite(text: string, color: string, fontSize = 28, width = 256, height = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `600 ${fontSize}px "Space Grotesk", -apple-system, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.6, 0.4, 1);
  return sprite;
}

export function UniverseHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check reduced motion or low-power device
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) {
      setIsLowEnd(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Ambient & Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x7c3aed, 1.8);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 1.5, 30);
    pointLight.position.set(-8, -6, 2);
    scene.add(pointLight);

    // Root interactive group
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Orbiting Ring with Tech Spheres
    const ringGroup = new THREE.Group();
    universeGroup.add(ringGroup);

    const torusGeo = new THREE.TorusGeometry(4.2, 0.02, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    ringGroup.add(torus);

    const sphereGeo = new THREE.SphereGeometry(0.22, 24, 24);
    ORBIT_ITEMS.forEach((item, i) => {
      const angle = (i / ORBIT_ITEMS.length) * Math.PI * 2;
      const radius = 4.2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const subGroup = new THREE.Group();
      subGroup.position.set(x, y, 0);

      const color = new THREE.Color(item.color);
      const sphereMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      subGroup.add(sphere);

      const labelSprite = createTextSprite(item.name, "#F5F5FA", 24, 256, 64);
      labelSprite.position.set(0, 0.45, 0);
      subGroup.add(labelSprite);

      ringGroup.add(subGroup);
    });

    // 2. Floating Code Glyphs
    const glyphsGroup = new THREE.Group();
    universeGroup.add(glyphsGroup);

    const glyphMeshes = CODE_GLYPHS.map((g) => {
      const sprite = createTextSprite(g.char, g.color, 42, 256, 128);
      sprite.position.set(g.pos[0], g.pos[1], g.pos[2]);
      sprite.scale.set(1.8, 0.9, 1);
      glyphsGroup.add(sprite);
      return {
        sprite,
        originY: g.pos[1],
        speed: 0.8 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // 3. Firefly Particle Field
    const fireflyCount = 90;
    const fireflyPos = new Float32Array(fireflyCount * 3);
    const fireflyPhases = new Float32Array(fireflyCount);

    for (let i = 0; i < fireflyCount; i++) {
      fireflyPos[i * 3] = (Math.random() - 0.5) * 40;
      fireflyPos[i * 3 + 1] = Math.random() * 18 - 8;
      fireflyPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      fireflyPhases[i] = Math.random() * Math.PI * 2;
    }

    const fireflyGeo = new THREE.BufferGeometry();
    fireflyGeo.setAttribute("position", new THREE.BufferAttribute(fireflyPos, 3));

    const fireflyMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.18,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const fireflyPoints = new THREE.Points(fireflyGeo, fireflyMat);
    universeGroup.add(fireflyPoints);

    // 4. Distant Tripura Hills Silhouette
    const hillsGeo = new THREE.PlaneGeometry(50, 20, 16, 16);
    const hillsMat = new THREE.MeshStandardMaterial({
      color: 0x071512,
      roughness: 0.95,
      metalness: 0.05,
    });
    const hills = new THREE.Mesh(hillsGeo, hillsMat);
    hills.position.set(0, -5, -8);
    hills.rotation.x = -Math.PI / 2.3;
    universeGroup.add(hills);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotationY = mouseX * 0.18;
      targetRotationX = -mouseY * 0.14;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera universe parallax
      universeGroup.rotation.y += (targetRotationY - universeGroup.rotation.y) * 0.06;
      universeGroup.rotation.x += (targetRotationX - universeGroup.rotation.x) * 0.06;

      // Orbiting ring rotation
      ringGroup.rotation.z = elapsed * 0.14;
      ringGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.18 + 0.32;

      // Floating code glyphs wave
      glyphMeshes.forEach((g) => {
        g.sprite.position.y = g.originY + Math.sin(elapsed * g.speed + g.phase) * 0.35;
      });

      // Drifting Fireflies
      const posArr = fireflyGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < fireflyCount; i++) {
        const idx = i * 3;
        posArr[idx] += Math.sin(elapsed * 0.5 + fireflyPhases[i]) * 0.012;
        posArr[idx + 1] += Math.cos(elapsed * 0.6 + fireflyPhases[i]) * 0.01;
        if (posArr[idx] > 20) posArr[idx] = -20;
        if (posArr[idx] < -20) posArr[idx] = 20;
        if (posArr[idx + 1] > 10) posArr[idx + 1] = -8;
        if (posArr[idx + 1] < -8) posArr[idx + 1] = 10;
      }
      fireflyGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      sphereGeo.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();
      hillsGeo.dispose();
      hillsMat.dispose();
    };
  }, [isLowEnd]);

  if (!hasWebGL || isLowEnd) {
    return <LightweightUniverseFallback />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
