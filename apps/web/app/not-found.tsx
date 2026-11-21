"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-night-950 text-foreground flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-violet/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-lg space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs">
          <Compass className="w-3.5 h-3.5" />
          <span>Coordinates Not Found in Orbit</span>
        </div>

        <div className="font-heading font-extrabold text-8xl sm:text-9xl tracking-tighter gradient-text">
          404
        </div>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
          Lost in the Northeast Night?
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          The quadrant you are attempting to traverse does not exist or has been shifted in the cosmos. Let&apos;s return back to Deepjoy&apos;s active terminal.
        </p>

        <Link
          href="/"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-xs font-mono font-bold uppercase tracking-wider shadow-glow hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Realign Navigation to Home</span>
        </Link>
      </div>
    </main>
  );
}
