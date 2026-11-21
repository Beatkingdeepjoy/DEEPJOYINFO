"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Play, Code, Sparkles, MapPin, Youtube } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { TRANSLATIONS, Locale } from "@/lib/i18n/translations";

const UniverseHeroScene = dynamic(
  () => import("../three/UniverseHeroScene").then((mod) => mod.UniverseHeroScene),
  { ssr: false }
);

export function Hero({ currentLocale }: { currentLocale: Locale }) {
  const t = TRANSLATIONS[currentLocale].hero;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full-Stack Developer",
    "B.Tech Student Vlogger",
    "Google Student Ambassador (Gemini AI)",
    "Founder of SHUDH DESI",
  ];

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < current.length) {
          setDisplayedRole(current.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(current.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* 3D Cosmos & Tripura Hills Background */}
      <UniverseHeroScene />

      {/* Atmospheric Vignette & Color Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-night-950/40 to-night-950 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Location & Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-glow"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="font-mono text-xs text-slate-300">
            Agartala, Tripura • ICFAI University
          </span>
          <span className="text-white/20">|</span>
          <Sparkles className="w-3.5 h-3.5 text-accent-magenta" />
          <span className="font-mono text-xs text-accent-magenta">Google Gemini Ambassador</span>
        </motion.div>

        {/* Large Split-Letter Name Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-4"
        >
          <span className="block drop-shadow-2xl">DEEPJOY</span>
          <span className="block gradient-text drop-shadow-2xl">BHOWMIK</span>
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-8 sm:h-10 flex items-center justify-center mb-6">
          <span className="font-mono text-lg sm:text-2xl text-cyan-300 font-semibold flex items-center">
            <span className="text-accent-violet mr-2">❯</span>
            {displayedRole}
            <span className="w-2.5 h-5 ml-1 bg-accent-cyan inline-block animate-pulse" />
          </span>
        </div>

        {/* Hero Tagline and Brand Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mb-3 font-normal"
        >
          &quot;{t.tagline}&quot;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs sm:text-sm text-muted font-mono tracking-wide uppercase mb-10"
        >
          — {t.subtagline}
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {/* View Work Button */}
          <button
            onClick={() => scrollTo("projects")}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="WORK"
            className="group relative px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold text-sm tracking-wide shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5"
          >
            <Code className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span>{t.viewWork}</span>
          </button>

          {/* Watch Channel Button */}
          <button
            onClick={() => scrollTo("youtube")}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="VLOGS"
            className="group px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5"
          >
            <Youtube className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            <span>{t.watchChannel}</span>
          </button>
        </motion.div>

        {/* Scroll To Explore Indicator */}
        <motion.button
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center text-muted hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[11px] tracking-widest uppercase mb-2 group-hover:text-cyan-300 transition-colors">
            Scroll to Explore
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </motion.button>
      </div>
    </section>
  );
}
