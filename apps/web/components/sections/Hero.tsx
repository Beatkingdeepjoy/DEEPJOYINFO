"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Sparkles, MapPin, Code2 } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { TRANSLATIONS, Locale } from "@/lib/i18n/translations";

export function Hero({ currentLocale }: { currentLocale: Locale }) {
  const t = TRANSLATIONS[currentLocale].hero;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Google Student Ambassador (Gemini AI)",
    "Full-Stack Web Engineer",
    "B.Tech Student Vlogger",
    "Founder of SHUDH DESI",
  ];

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

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
      className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFF9F5] to-[#F5EBE1] pt-32 pb-24 sm:pt-36 sm:pb-32 text-slate-900"
    >
      {/* Soft Ambient Radial Warm Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-orange-200/40 via-amber-100/30 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-200/25 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
        {/* Top Hello Badge with Playful Sketched Accent Marks (Directly from Jayesh Patil Reference) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center justify-center mb-5"
        >
          {/* Left sketched rays */}
          <span className="text-orange-500 font-serif font-bold text-lg select-none mr-2 tracking-tighter opacity-80 animate-pulse">
            \ \
          </span>
          <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs sm:text-sm font-semibold tracking-wide">
            <span>Hello!</span>
            <span>👋</span>
          </div>
          {/* Right sketched rays */}
          <span className="text-orange-500 font-serif font-bold text-lg select-none ml-2 tracking-tighter opacity-80 animate-pulse">
            / /
          </span>
        </motion.div>

        {/* Confident Human Typography Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mb-6"
        >
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-slate-900 leading-[1.08]">
            I&apos;m{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              Deepjoy
              {/* Subtle organic brush underline */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-2.5 text-orange-400/70"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q 50 1 100 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            ,<br />
            <span className="text-slate-900">Full-Stack Developer</span>
          </h1>

          {/* Dynamic Typewriter Role Pill */}
          <div className="h-8 flex items-center justify-center mt-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-semibold font-mono shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{displayedRole}</span>
              <span className="w-1.5 h-3.5 bg-orange-600 inline-block animate-pulse ml-0.5" />
            </div>
          </div>
        </motion.div>

        {/* 3-Column Dribbble/Figma Auto-Layout Composition */}
        <div className="w-full max-w-5xl mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Floating Credibility Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 p-6 rounded-3xl shadow-xl space-y-4 hover:shadow-2xl transition-all">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xs">
                <Code2 className="w-5 h-5" />
              </div>

              <div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed font-sans">
                  &ldquo;I build the web by night and film the journey by day.&rdquo;
                </p>
                <span className="block text-[11px] font-mono text-slate-500 mt-2 uppercase tracking-wide">
                  — Coding is my hobby, vlogging is my passion.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Agartala, Tripura</span>
                </span>
                <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center: Real Portrait in Warm Geometric Apricot Arch with Floating CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-64 sm:w-80 md:w-96 aspect-[4/5] flex items-end justify-center">
              {/* Warm Apricot/Amber Geometric Arch Backdrop (Exact from Reference Image) */}
              <div className="absolute inset-x-2 bottom-0 top-12 rounded-t-[140px] bg-gradient-to-b from-[#FFA56E] via-[#FF8F4D] to-[#FF7526] shadow-2xl" />

              {/* Glowing Halo */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-400/40 rounded-full blur-[60px] pointer-events-none" />

              {/* Deepjoy's Real Photo Portrait */}
              <img
                src="/deepjoy-avatar.png"
                alt="Deepjoy Bhowmik - Full-Stack Developer & Google Gemini Ambassador"
                className="relative z-10 w-full h-full object-cover object-top rounded-t-[140px] filter drop-shadow-xl select-none"
              />

              {/* Floating Signature Action Pills (Exact from Reference: Portfolio ↗ & Hire me) */}
              <div className="absolute bottom-5 z-20 flex items-center space-x-2.5 p-1.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/20 shadow-2xl">
                <button
                  onClick={() => scrollTo("projects")}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
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
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 p-6 rounded-3xl shadow-xl space-y-4 hover:shadow-2xl transition-all">
              {/* Star Rating Badge */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-mono font-bold text-amber-700 ml-1.5">5.0</span>
              </div>

              <div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                  30+ Students
                </div>
                <p className="text-xs text-slate-600 font-sans mt-0.5 leading-snug">
                  Mentored in Generative AI via Google Student Ambassador workshops
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Public Repos</span>
                  <span className="font-bold text-orange-600">43 Repos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Education</span>
                  <span className="text-slate-800 font-semibold">ICFAI University</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Core Project</span>
                  <span className="text-orange-600 font-semibold">SHUDH DESI (80%)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
