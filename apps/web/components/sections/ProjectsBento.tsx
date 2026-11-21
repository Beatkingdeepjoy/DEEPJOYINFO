"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderGit2, ExternalLink, ArrowRight, Sparkles, Layers } from "lucide-react";
import { PROJECTS } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";
import { LaptopShowcase } from "../three/LaptopShowcase";
import { EvolutionSlider } from "./EvolutionSlider";

export function ProjectsBento() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "E-Commerce", "Full Stack", "Frontend"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-magenta/10 border border-accent-magenta/30 text-accent-magenta font-mono text-xs uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5 text-accent-magenta" />
            <span>03 // Engineering Portfolio</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Featured Projects & Bento
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real products built to serve community needs, solve Northeast India commerce challenges, and advance developer tooling.
          </p>
        </div>

        {/* 3D Laptop Interactive Preview */}
        <LaptopShowcase />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                soundFx.playClick();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? "coral-gradient text-white font-bold shadow-sm"
                  : "bg-white/5 text-muted hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="VIEW"
              className="glass-card-pro p-7 rounded-3xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-orange-300">
                    {project.category}
                  </span>
                  {project.slug === "shudh-desi" ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono text-[11px] font-bold">
                      80% Ready
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[11px]">
                      Live
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-night-900 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Links */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span>Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      onClick={() => soundFx.playClick()}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      <FolderGit2 className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo Link"
                      onClick={() => soundFx.playClick()}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evolution Slider */}
        <EvolutionSlider />
      </div>
    </section>
  );
}
