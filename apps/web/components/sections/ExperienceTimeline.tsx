"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden bg-night-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-violet font-mono text-xs uppercase tracking-widest mb-4">
            <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
            <span>04 // Career Milestones</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real responsibilities: from pioneering on-campus generative AI adoption to building secure state government portals.
          </p>
        </div>

        {/* Scroll-Driven Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-night-950 border-2 border-accent-cyan flex items-center justify-center group-hover:scale-125 transition-transform shadow-glow-cyan">
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              </div>

              {/* Timeline Card */}
              <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-violet/20 border border-accent-violet/40 text-accent-cyan font-mono text-xs mb-1">
                      {exp.badge}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-300">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-muted space-y-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-accent-magenta" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent-cyan mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-night-900 border border-white/5 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
