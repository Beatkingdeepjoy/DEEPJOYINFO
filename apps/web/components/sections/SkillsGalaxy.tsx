"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Orbit, Award, CheckCircle2, Cpu } from "lucide-react";
import { SKILL_CATEGORIES, CURRENTLY_LEARNING, CERTIFICATIONS } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.name)];

  const filteredCategories =
    activeCategory === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.name === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden bg-night-950/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono text-xs uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
            <span>02 // Technical Universe</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Skills Galaxy & Orbs
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A comprehensive matrix of verified programming languages, backend systems, CS fundamentals, and active frontiers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                soundFx.playClick();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeCategory === cat
                  ? "bg-accent-violet text-white shadow-glow border border-accent-violet"
                  : "bg-white/5 text-muted hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categorized Skills Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCategories.map((group) => (
            <motion.div
              key={group.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-lg text-white">
                    {group.name}
                  </h3>
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color, boxShadow: `0 0 10px ${group.color}` }}
                  />
                </div>

                {/* Skill Orbs */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      onMouseEnter={() => soundFx.playHover()}
                      data-cursor="SKILL"
                      className="group relative px-3.5 py-1.5 rounded-xl bg-night-900/90 border border-white/10 hover:border-cyan-400/60 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="font-mono text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>Verified Competency</span>
                <span>{group.skills.length} Capabilities</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "Currently Learning" Orbital Constellation */}
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-accent-violet/20 via-night-900 to-accent-cyan/20 border border-accent-cyan/40 shadow-glow mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
                <Orbit className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                <span>Active Learning Orbit</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Accelerating Modern Architectures
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Actively expanding horizons into reactive frameworks, type-safe full stack systems, and agentic workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {CURRENTLY_LEARNING.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2.5 rounded-2xl bg-night-950/80 border border-accent-cyan/40 shadow-glow-cyan text-sm font-mono font-bold text-cyan-300 flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-accent-magenta animate-pulse" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Showcase */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-accent-violet" />
            <h3 className="font-heading font-bold text-xl text-white">
              Verified Certifications & Accreditations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-cyan-300">
                      {cert.badge}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-sm text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-accent-violet font-mono mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
