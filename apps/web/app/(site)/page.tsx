"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Locale } from "@/lib/i18n/translations";

const Preloader = dynamic(
  () => import("@/components/sections/Preloader").then((mod) => mod.Preloader),
  { ssr: false }
);
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGalaxy } from "@/components/sections/SkillsGalaxy";
import { ProjectsBento } from "@/components/sections/ProjectsBento";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { YouTubeDashboard } from "@/components/sections/YouTubeDashboard";
import { GitHubLeetCode } from "@/components/sections/GitHubLeetCode";
import { SponsorCollab } from "@/components/sections/SponsorCollab";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-night-950 text-foreground overflow-x-hidden">
      {/* 3D DB Particle Logo Preloader */}
      {mounted && !preloaded && <Preloader onComplete={() => setPreloaded(true)} />}

      {/* Global Navigation Bar */}
      <Navbar currentLocale={locale} onLocaleChange={setLocale} />

      {/* Main Sections Stream */}
      <main className="relative z-10 flex flex-col">
        {/* 01. Hero Universe */}
        <Hero currentLocale={locale} />

        {/* 02. About & Ambassador Highlight */}
        <About currentLocale={locale} />

        {/* 03. Skills Galaxy & Learning Orbit */}
        <SkillsGalaxy />

        {/* 04. Projects Bento & 3D Laptop Preview */}
        <ProjectsBento />

        {/* 05. Experience Timeline */}
        <ExperienceTimeline />

        {/* 06. YouTube Hub & Vlogs */}
        <YouTubeDashboard />

        {/* 07. GitHub Repos & LeetCode Heatmap */}
        <GitHubLeetCode />

        {/* 08. Brand Sponsorship & Collab */}
        <SponsorCollab />

        {/* 09. Contact Form */}
        <ContactSection currentLocale={locale} />
      </main>

      {/* 10. Marquee & Global Footer */}
      <Footer currentLocale={locale} />
    </div>
  );
}
