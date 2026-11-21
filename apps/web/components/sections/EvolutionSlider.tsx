"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, ArrowLeftRight, ExternalLink } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";

export function EvolutionSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Evolution // Before & After</span>
          </div>
          <h3 className="font-heading font-bold text-2xl text-white">
            From Vanilla HTML/CSS to 3D Reactive Universe
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            Drag the slider to compare Portfolio v1 (2024) against this next-gen platform.
          </p>
        </div>

        <a
          href="https://myportfolio-six-wheat.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-colors self-start sm:self-auto"
        >
          <span>Visit Old Portfolio v1</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
      >
        {/* Layer B: New 3D Platform (Underneath, Full) */}
        <div className="absolute inset-0 bg-night-950 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-violet/30 via-night-950 to-night-950">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs mb-3">
            Portfolio v2.0 (Current Platform)
          </div>
          <h4 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mb-2">
            Next.js 15 • Three.js 3D • GLSL Shaders
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Cinematic dark universe, R3F floating glyphs, YouTube sync, real-time AI assistant, full-stack moderation backend.
          </p>
        </div>

        {/* Layer A: Old Portfolio v1 (Clipped on the left) */}
        <div
          className="absolute inset-0 bg-slate-900 border-r-2 border-accent-cyan flex flex-col items-center justify-center p-8 text-center"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs mb-3">
            Portfolio v1.0 (2024 Initial Build)
          </div>
          <h4 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-200 mb-2">
            Static HTML5 • CSS3 • Vanilla JS
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            First personal website built as an ICFAI freshman. Traditional card layout, static text content, basic CSS animations.
          </p>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-accent-cyan pointer-events-none shadow-glow-cyan"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-night-950 border-2 border-accent-cyan flex items-center justify-center text-accent-cyan shadow-lg">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
