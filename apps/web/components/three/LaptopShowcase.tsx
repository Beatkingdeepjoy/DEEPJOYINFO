"use client";

import React, { useState } from "react";
import { Laptop, ExternalLink, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { PROJECTS } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export function LaptopShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = PROJECTS.slice(0, 3);
  const current = featured[activeIdx];

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 mb-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Side: Interactive Screen Tabs & Metrics */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            <Laptop className="w-3.5 h-3.5" />
            <span>Interactive Device Preview</span>
          </div>

          <div>
            <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-2">
              {current.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {current.summary}
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {featured.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => {
                  setActiveIdx(idx);
                  soundFx.playClick();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeIdx === idx
                    ? "bg-accent-violet text-white shadow-glow border border-accent-violet"
                    : "bg-white/5 text-muted hover:text-white border border-white/5"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Metrics & Progress Ring */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {current.slug === "shudh-desi" ? (
              <div className="glass-panel p-4 rounded-2xl border border-accent-cyan/30 flex items-center space-x-3 col-span-2 sm:col-span-1">
                {/* 80% Progress Ring */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3.5"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="18"
                      stroke="#22D3EE"
                      strokeWidth="3.5"
                      strokeDasharray="113.1"
                      strokeDashoffset="22.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute font-mono text-[11px] font-bold text-cyan-300">
                    80%
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted">Status</div>
                  <div className="text-xs font-bold text-white">Launching Soon</div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted">Status</div>
                  <div className="text-xs font-bold text-white">Production Live</div>
                </div>
              </div>
            )}

            {current.metrics?.map((m) => (
              <div key={m.label} className="glass-panel p-4 rounded-2xl border border-white/5">
                <div className="text-[10px] font-mono uppercase text-muted">{m.label}</div>
                <div className="text-xs font-semibold text-white">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {current.liveUrl && (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-xs font-semibold flex items-center space-x-2 shadow-glow hover:scale-105 active:scale-95 transition-all"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={`/projects/${current.slug}`}
              onClick={() => soundFx.playClick()}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center space-x-2 transition-all"
            >
              <span>Case Study & Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Right Side: 3D-styled Laptop Frame */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg group">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/30 to-accent-cyan/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60" />

            {/* Laptop Body Outer Bezel */}
            <div className="relative bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-3 sm:p-4 rounded-t-2xl rounded-b-sm border border-slate-600 shadow-2xl">
              {/* Webcam Notch */}
              <div className="w-2 h-2 rounded-full bg-slate-950 mx-auto mb-2 border border-slate-700" />

              {/* Laptop Screen Viewport */}
              <div className="relative aspect-[16/10] bg-night-950 rounded-lg overflow-hidden border border-white/10 flex flex-col">
                {/* Simulated Browser URL bar */}
                <div className="px-3 py-1.5 bg-night-900 border-b border-white/10 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 px-3 py-0.5 rounded bg-night-950 text-[10px] font-mono text-slate-400 truncate flex items-center justify-between">
                    <span>{current.liveUrl || "https://deepjoy.dev/projects/" + current.slug}</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>

                {/* Simulated Screen Content with liquid gradient overlay */}
                <div className="flex-1 relative p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-night-900 via-night-950 to-night-900">
                  <div className="space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-accent-violet/20 border border-accent-violet/30 text-accent-cyan font-mono text-[10px]">
                      {current.category}
                    </div>
                    <h4 className="font-heading font-extrabold text-xl text-white">
                      {current.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-3">
                      {current.problem}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {current.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base & Trackpad Lip */}
            <div className="h-3.5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-b-xl border-t border-slate-700 shadow-xl flex justify-center">
              <div className="w-20 h-1 bg-slate-400/30 rounded-b-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
