"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/sound/soundEffects";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Canvas 2D / WebGL particle representation of "DB" logo
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 320);
    const height = (canvas.height = 320);

    // Target positions roughly forming D and B
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      targetX: number;
      targetY: number;
      color: string;
      size: number;
      speed: number;
    }

    const particles: Particle[] = [];
    const colors = ["#7C3AED", "#22D3EE", "#E879F9", "#FFFFFF"];

    // Generate letters 'D' and 'B' points
    for (let i = 0; i < 180; i++) {
      const isD = i < 90;
      let targetX = 0;
      let targetY = 0;

      if (isD) {
        // 'D' shape
        const t = (i / 90) * Math.PI;
        if (i < 30) {
          // Vertical spine of D
          targetX = 100;
          targetY = 100 + i * 4;
        } else {
          // Curve of D
          targetX = 100 + Math.sin(t) * 45;
          targetY = 160 - Math.cos(t) * 55;
        }
      } else {
        // 'B' shape
        const bIdx = i - 90;
        const t = (bIdx / 45) * Math.PI;
        if (bIdx < 30) {
          // Vertical spine of B
          targetX = 175;
          targetY = 100 + bIdx * 4;
        } else if (bIdx < 60) {
          // Top loop
          targetX = 175 + Math.sin(t) * 35;
          targetY = 130 - Math.cos(t) * 28;
        } else {
          // Bottom loop
          targetX = 175 + Math.sin(t) * 38;
          targetY = 185 - Math.cos(t) * 32;
        }
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        targetX,
        targetY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.2 + 1,
        speed: 0.05 + Math.random() * 0.03,
      });
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2.5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          soundFx.playSuccess();
          setTimeout(onComplete, 600);
        }, 300);
      }
      setProgress(Math.floor(currentProgress));
    }, 40);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const ratio = currentProgress / 100;

      particles.forEach((p) => {
        // Lerp towards target based on progress
        p.x = p.originX + (p.targetX - p.originX) * ratio;
        p.y = p.originY + (p.targetY - p.originY) * ratio;

        // Slight drift
        p.x += Math.sin(Date.now() * 0.003 + p.targetY) * (1 - ratio) * 2;
        p.y += Math.cos(Date.now() * 0.003 + p.targetX) * (1 - ratio) * 2;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    soundFx.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night-950 overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-violet/15 blur-[120px] pointer-events-none" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-accent-cyan/10 blur-[90px] pointer-events-none" />

          {/* Particle Canvas */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-heading font-extrabold text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-cyan-400 to-accent-magenta opacity-30 select-none">
                DB
              </span>
            </div>
          </div>

          {/* Progress Counter & Brand Text */}
          <div className="mt-4 flex flex-col items-center space-y-3 z-10">
            <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              <span className="gradient-text">{progress}</span>
              <span className="text-muted text-2xl ml-1">%</span>
            </div>

            <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-magenta"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {progress < 40
                ? "Assembling Cosmic Particles..."
                : progress < 80
                ? "Loading Northeast Shaders..."
                : "Initialising Deepjoy Platform..."}
            </p>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-muted hover:text-white font-mono text-xs tracking-wider transition-all"
          >
            SKIP INTRO ❯
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
