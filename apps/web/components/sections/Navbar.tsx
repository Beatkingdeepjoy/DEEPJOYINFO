"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Moon, Sun, Menu, X, Command, Globe, FileText } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { TRANSLATIONS, Locale } from "@/lib/i18n/translations";

export function Navbar({
  currentLocale,
  onLocaleChange,
}: {
  currentLocale: Locale;
  onLocaleChange: (loc: Locale) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const t = TRANSLATIONS[currentLocale].nav;

  useEffect(() => {
    setIsMuted(soundFx.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
  };

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    soundFx.playClick();
  };

  const navLinks = [
    { href: "#about", label: t.about },
    { href: "#services", label: "Services" },
    { href: "#skills", label: t.skills },
    { href: "#projects", label: t.projects },
    { href: "#experience", label: t.experience },
    { href: "#youtube", label: t.youtube },
    { href: "/blog", label: t.blog },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-night-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-glass"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="flex items-center space-x-2.5 group"
          onClick={() => soundFx.playClick()}
          onMouseEnter={() => soundFx.playHover()}
        >
          <div className="w-10 h-10 rounded-2xl coral-gradient p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-night-950 rounded-[14px] flex items-center justify-center">
              <span className="font-heading font-extrabold text-base text-white group-hover:text-orange-300 transition-colors">
                DB
              </span>
            </div>
          </div>
          <div>
            <span className="font-heading font-bold text-sm tracking-wide text-foreground">
              Deepjoy Bhowmik
            </span>
            <span className="block text-[10px] font-mono text-muted tracking-tight">
              Agartala, Tripura
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 glass-card-pro px-3 py-1.5 rounded-full">
          <a
            href="#hero"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            className="px-4 py-1.5 text-xs font-semibold text-white coral-gradient rounded-full shadow-sm transition-all"
          >
            Home
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/resume"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-orange-300 bg-orange-950/40 hover:bg-orange-900/40 border border-orange-500/30 rounded-full transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </Link>
        </nav>

        {/* Right Tools Controls */}
        <div className="flex items-center space-x-2">
          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden md:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full coral-gradient text-white font-semibold text-xs tracking-wide shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <span>Hire Me</span>
          </a>
          {/* Language Selector Dropdown */}
          <div className="relative group">
            <button
              aria-label="Language selection"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-muted hover:text-foreground text-xs flex items-center space-x-1 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="font-mono uppercase text-[11px] font-semibold">{currentLocale}</span>
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-28 bg-night-900 border border-white/10 rounded-xl shadow-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all backdrop-blur-lg z-50">
              <button
                onClick={() => {
                  onLocaleChange("en");
                  soundFx.playClick();
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-white/5 ${
                  currentLocale === "en" ? "text-cyan-400 font-bold" : "text-muted"
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  onLocaleChange("hi");
                  soundFx.playClick();
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-white/5 ${
                  currentLocale === "hi" ? "text-cyan-400 font-bold" : "text-muted"
                }`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => {
                  onLocaleChange("bn");
                  soundFx.playClick();
                }}
                className={`w-full px-3 py-1.5 text-left text-xs hover:bg-white/5 ${
                  currentLocale === "bn" ? "text-cyan-400 font-bold" : "text-muted"
                }`}
              >
                বাংলা (Bengali)
              </button>
            </div>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleSoundToggle}
            aria-label="Toggle UI Sounds"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-muted hover:text-foreground transition-all"
            title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-muted hover:text-foreground transition-all"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-violet-400" />}
          </button>

          {/* Cmd+K Hint Button for Desktop */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
            }}
            className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-muted font-mono transition-all"
            title="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="text-[10px]">K</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              soundFx.playClick();
            }}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 bg-night-950/95 border-b border-white/10 backdrop-blur-xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundFx.playClick();
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/resume"
              onClick={() => {
                setMobileMenuOpen(false);
                soundFx.playClick();
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-950/30 border border-cyan-500/20"
            >
              Curriculum Vitae (CV)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
