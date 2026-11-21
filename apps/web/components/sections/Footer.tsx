"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Github, Linkedin, Youtube, Code2, Mail, Heart, Sparkles, Users } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";
import { TRANSLATIONS, Locale } from "@/lib/i18n/translations";

export function Footer({ currentLocale }: { currentLocale: Locale }) {
  const t = TRANSLATIONS[currentLocale].footer;
  const [visitorCount, setVisitorCount] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Generate organic simulated live active session count
    setVisitorCount(Math.floor(Math.random() * 8) + 4);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);
    soundFx.playSuccess();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsLaunching(false), 1200);
  };

  const socials = [
    {
      name: "GitHub",
      url: PERSONAL_INFO.contacts.github,
      icon: <Github className="w-5 h-5" />,
      color: "hover:text-slate-100",
    },
    {
      name: "LinkedIn",
      url: PERSONAL_INFO.contacts.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      url: PERSONAL_INFO.contacts.youtube,
      icon: <Youtube className="w-5 h-5" />,
      color: "hover:text-red-400",
    },
    {
      name: "LeetCode",
      url: PERSONAL_INFO.contacts.leetcode,
      icon: <Code2 className="w-5 h-5" />,
      color: "hover:text-amber-400",
    },
    {
      name: "Email",
      url: `mailto:${PERSONAL_INFO.contacts.developerEmail}`,
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-cyan-400",
    },
  ];

  return (
    <footer className="relative bg-night-950 border-t border-white/10 overflow-hidden">
      {/* Big Marquee Ticker */}
      <div className="py-6 border-b border-white/10 overflow-hidden whitespace-nowrap bg-night-900/40 select-none">
        <div className="inline-block animate-ticker">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-heading font-extrabold text-3xl sm:text-5xl text-white/20 tracking-tighter mx-4 uppercase">
              ✦ LET&apos;S BUILD SOMETHING ✦ CODING IS MY HOBBY, VLOGGING IS MY PASSION ✦ AGARTALA TRIPURA ✦ GOOGLE GEMINI AMBASSADOR ✦
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          {/* Brand & Mission Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              onClick={() => soundFx.playClick()}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-magenta p-[1.5px] shadow-glow">
                <div className="w-full h-full bg-night-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-extrabold text-lg text-white">DB</span>
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xs font-mono text-cyan-400">
                  Agartala, Tripura
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              &quot;{PERSONAL_INFO.heroTagline}&quot; Full-stack developer, B.Tech student vlogger, and Google Student Ambassador (Gemini AI).
            </p>

            {/* Live Visitor Counter Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Users className="w-3.5 h-3.5" />
              <span>{visitorCount} Live Global Visitors</span>
            </div>
          </div>

          {/* Quick Sitemap Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-2.5">
              <div className="text-white font-bold uppercase tracking-wider mb-2">Sections</div>
              <div><a href="#about" className="text-muted hover:text-white transition-colors">About</a></div>
              <div><a href="#skills" className="text-muted hover:text-white transition-colors">Skills</a></div>
              <div><a href="#projects" className="text-muted hover:text-white transition-colors">Projects</a></div>
              <div><a href="#experience" className="text-muted hover:text-white transition-colors">Experience</a></div>
              <div><a href="#youtube" className="text-muted hover:text-white transition-colors">YouTube Hub</a></div>
            </div>
            <div className="space-y-2.5">
              <div className="text-white font-bold uppercase tracking-wider mb-2">Platform</div>
              <div><Link href="/blog" className="text-muted hover:text-white transition-colors">Blog & Guides</Link></div>
              <div><Link href="/resume" className="text-muted hover:text-white transition-colors">Curriculum Vitae</Link></div>
              <div><Link href="/guestbook" className="text-muted hover:text-white transition-colors">Guestbook</Link></div>
              <div><a href="#collab" className="text-muted hover:text-white transition-colors">Brand Collab</a></div>
              <div><Link href="/admin" className="text-muted hover:text-cyan-400 transition-colors">Admin Gateway</Link></div>
            </div>
          </div>

          {/* Socials & Rocket Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-6">
            <div className="flex items-center space-x-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-muted transition-all duration-300 hover:scale-110 active:scale-95 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Back to Top Rocket Animation Button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundFx.playHover()}
              className="group px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 flex items-center space-x-2 transition-all hover:border-cyan-400/50"
              title="Launch back to top"
            >
              <span>{t.backToTop}</span>
              <Rocket
                className={`w-4 h-4 text-cyan-400 group-hover:-translate-y-1 transition-transform ${
                  isLaunching ? "-translate-y-8 opacity-0 duration-700" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted gap-2">
          <div>
            © {new Date().getFullYear()} {t.rights}
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with passion, late-night tea & Gemini AI</span>
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          </div>
        </div>
      </div>
    </footer>
  );
}
