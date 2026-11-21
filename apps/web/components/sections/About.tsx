"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, FolderGit2, Code2, Award, ExternalLink, Flame } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { TRANSLATIONS, Locale } from "@/lib/i18n/translations";
import { soundFx } from "@/lib/sound/soundEffects";

export function About({ currentLocale }: { currentLocale: Locale }) {
  const t = TRANSLATIONS[currentLocale].about;

  const statCards = [
    {
      label: t.studentsCount,
      value: PERSONAL_INFO.counters.studentsOnboarded,
      icon: <Users className="w-5 h-5 text-accent-cyan" />,
      subtext: "Career Glow-up Night workshop participants",
    },
    {
      label: t.reposCount,
      value: `${PERSONAL_INFO.counters.publicRepos}`,
      icon: <FolderGit2 className="w-5 h-5 text-accent-violet" />,
      subtext: "Open-source work on GitHub (Beatkingdeepjoy)",
    },
    {
      label: t.projectsCount,
      value: `${PERSONAL_INFO.counters.projectsBuilt}`,
      icon: <Code2 className="w-5 h-5 text-accent-magenta" />,
      subtext: "Full-stack & production platforms",
    },
    {
      label: t.yearsCount,
      value: PERSONAL_INFO.counters.yearsCoding,
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      subtext: "Continuous code crafting & learning",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-cyan font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>01 // About Deepjoy</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Grid: Story & Ambassador Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Portrait & Campus Life Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-orange-500/30 via-white/5 to-amber-500/20 shadow-glow">
              <div className="relative rounded-[22px] overflow-hidden bg-night-900 aspect-[4/5] flex flex-col justify-end p-6">
                {/* Stylized Portrait Visual Background */}
                <div
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('/deepjoy-avatar.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent" />

                {/* Overlaid Badges */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                    ● Student Engineer & Creator
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Deepjoy Bhowmik
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    ICFAI University Tripura • Computer Science & Engineering
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Education Card */}
            <div className="glass-card-pro p-6 rounded-3xl space-y-2">
              <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs font-semibold uppercase">
                <Award className="w-4 h-4" />
                <span>Formal Education</span>
              </div>
              <h4 className="font-heading font-bold text-base text-white">
                {PERSONAL_INFO.education.degree}
              </h4>
              <p className="text-sm text-slate-300">
                {PERSONAL_INFO.education.institution} ({PERSONAL_INFO.education.period})
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Google Gemini Highlight (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Card */}
            <div className="glass-card-pro p-8 rounded-3xl space-y-4">
              <h3 className="font-heading font-bold text-2xl text-white">
                Building By Night, Vlogging By Day
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am an undergraduate Computer Science student based in{" "}
                <span className="text-orange-400 font-semibold">Agartala, Tripura</span>. When I&apos;m not architecting full-stack web applications like{" "}
                <span className="text-amber-400 font-semibold">SHUDH DESI</span> or studying data structures at ICFAI University, I pick up my camera to capture authentic B.Tech hostel life, coding late into the morning, and the untold stories of engineering in Northeast India.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                My mission is twofold: write robust, production-grade code that solves tangible regional problems, and inspire other students across India that you don&apos;t need a metro city to build world-class digital platforms.
              </p>
            </div>

            {/* Google Gemini Ambassador Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-orange-500/15 via-night-900 to-amber-500/15 border border-orange-500/30 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-violet to-accent-cyan p-[1.5px]">
                    <div className="w-full h-full bg-night-950 rounded-[14px] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent-cyan animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-accent-cyan block">
                      Leadership Fellowship
                    </span>
                    <h4 className="font-heading font-bold text-xl text-white">
                      Google Student Ambassador (Gemini AI)
                    </h4>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
                  Active 2026
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Selected as an on-campus student leader to empower peers with Google Gemini AI. Successfully hosted the &quot;Career Glow-up Night&quot; workshop onboarding 30+ active student builders into generative AI, prompt engineering, and autonomous agent systems.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Google Gemini API", "Prompt Engineering", "Multi-Agent Concepts", "Workshop Mentorship"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      #{badge}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stat Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-card-pro p-6 rounded-3xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                  {card.icon}
                </span>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl coral-gradient-text">
                  {card.value}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white mb-1">
                  {card.label}
                </h4>
                <p className="text-xs text-muted font-sans">
                  {card.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
