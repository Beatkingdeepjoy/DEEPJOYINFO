"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, Star, Sparkles, MapPin, Code2, Award, CheckCircle2 } from "lucide-react";
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
    "Google Student Ambassador (Gemini AI)",
    "B.Tech Student Vlogger",
    "Founder of SHUDH DESI",
  ];

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 70;

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
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pb-24"
    >
      {/* Delicate Atmospheric Ambient 3D Backdrop */}
      <UniverseHeroScene />

      {/* Radial Warm Glow at Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Hello Badge (Inspired by Jayesh Patil Reference) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider backdrop-blur-md mb-5 shadow-sm"
        >
          <span>Hello! 👋</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-300 font-sans normal-case">Deepjoy Bhowmik</span>
        </motion.div>

        {/* Confident Human Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mb-4"
        >
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.08]">
            I&apos;m <span className="coral-gradient-text">Deepjoy</span>,<br />
            <span className="text-slate-200">Full-Stack Developer</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div className="h-7 sm:h-9 flex items-center justify-center mt-3">
            <span className="font-mono text-sm sm:text-lg text-orange-300 font-semibold flex items-center">
              <span className="text-orange-500 mr-2">❯</span>
              <span>{displayedRole}</span>
              <span className="w-2 h-4 ml-1 bg-orange-400 inline-block animate-pulse" />
            </span>
          </div>
        </motion.div>

        {/* 3-Column Dribbble/Figma Auto-Layout Composition */}
        <div className="w-full max-w-5xl mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Floating Credibility Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="glass-card-pro p-6 rounded-3xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Code2 className="w-5 h-5" />
              </div>

              <div>
                <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;I build the web by night and film the journey by day.&rdquo;
                </p>
                <span className="block text-[11px] font-mono text-muted mt-2 uppercase tracking-wide">
                  — Coding is my hobby, vlogging is my passion.
                </span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-orange-400" />
                  <span>Agartala, Tripura</span>
                </span>
                <span className="text-emerald-400 font-semibold">● Active</span>
              </div>
            </div>
          </motion.div>

          {/* Center: Real Portrait in Warm Geometric Arch with Floating CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[4/5] flex items-end justify-center">
              {/* Warm Apricot/Amber Geometric Arch Backdrop (Matching Reference Image) */}
              <div className="absolute inset-x-2 bottom-0 top-10 rounded-t-[140px] bg-gradient-to-b from-orange-500/20 via-amber-500/15 to-night-900 border border-orange-500/30 shadow-2xl backdrop-blur-md" />

              {/* Glowing Halo */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[70px] pointer-events-none" />

              {/* Deepjoy's Real Photo Portrait */}
              <img
                src="/deepjoy-avatar.png"
                alt="Deepjoy Bhowmik - Full-Stack Developer & Google Gemini Ambassador"
                className="relative z-10 w-full h-full object-cover object-top rounded-t-[140px] filter drop-shadow-2xl select-none"
              />

              {/* Floating Signature Action Pills (Exact from Reference: Portfolio ↗ & Hire me) */}
              <div className="absolute bottom-5 z-20 flex items-center space-x-2.5 p-1.5 rounded-full glass-card-pro shadow-2xl border border-white/15">
                <button
                  onClick={() => scrollTo("projects")}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-5 py-2.5 rounded-full coral-gradient text-white font-semibold text-xs sm:text-sm tracking-wide shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Hire me</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Metric Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col justify-center order-3"
          >
            <div className="glass-card-pro p-6 rounded-3xl space-y-4">
              {/* Star Rating Badge */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-mono font-bold text-amber-300 ml-1.5">5.0</span>
              </div>

              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  30+ Students
                </div>
                <p className="text-xs text-muted font-sans mt-0.5">
                  Mentored in Generative AI via Google Student Ambassador workshops
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center justify-between">
                  <span>Public Repos</span>
                  <span className="font-bold text-orange-400">43 Repos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Education</span>
                  <span className="text-slate-300">ICFAI University</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Core Project</span>
                  <span className="text-cyan-300">SHUDH DESI (80%)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
