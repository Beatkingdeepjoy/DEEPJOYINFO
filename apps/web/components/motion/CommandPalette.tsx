"use client";

import React, { useState, useEffect } from "react";
import { Search, Compass, Moon, Sun, Volume2, VolumeX, ExternalLink, FileText, Sparkles, X } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleSound = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    soundFx.playClick();
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openLink = (url: string) => {
    setIsOpen(false);
    soundFx.playClick();
    window.open(url, "_blank");
  };

  const actions = [
    { id: "hero", label: "Jump to Overview (Hero)", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("hero") },
    { id: "about", label: "About Deepjoy & Journey", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("about") },
    { id: "skills", label: "Explore Skills Galaxy", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("skills") },
    { id: "projects", label: "Featured Projects Bento", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("projects") },
    { id: "experience", label: "Experience & Ambassador Timeline", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("experience") },
    { id: "youtube", label: "YouTube Dashboard & Vlogs", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("youtube") },
    { id: "github", label: "GitHub & LeetCode Heatmap", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("github") },
    { id: "contact", label: "Contact & Collaborations", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => scrollTo("contact") },
    { id: "resume", label: "View Curriculum Vitae (CV)", icon: <FileText className="w-4 h-4 text-violet-400" />, action: () => window.location.href = "/resume" },
    {
      id: "audio",
      label: isMuted ? "Enable Ambient Audio Sounds" : "Mute Sound Effects",
      icon: isMuted ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-amber-400" />,
      action: toggleSound,
    },
    {
      id: "theme",
      label: `Switch to ${theme === "dark" ? "Light Mode" : "Dark (Northeast Night) Mode"}`,
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />,
      action: toggleTheme,
    },
    { id: "yt-channel", label: "Open YouTube Channel (@deepjoybhowmikofficial)", icon: <ExternalLink className="w-4 h-4 text-red-400" />, action: () => openLink(PERSONAL_INFO.contacts.youtube) },
    { id: "gh-profile", label: "Open GitHub Profile (Beatkingdeepjoy)", icon: <ExternalLink className="w-4 h-4 text-slate-300" />, action: () => openLink(PERSONAL_INFO.contacts.github) },
    { id: "lc-profile", label: "Open LeetCode Profile", icon: <ExternalLink className="w-4 h-4 text-orange-400" />, action: () => openLink(PERSONAL_INFO.contacts.leetcode) },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-night-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-night-950/50">
          <Search className="w-5 h-5 text-muted mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted font-sans text-sm"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/10 rounded text-muted">
            ESC
          </kbd>
          <button onClick={() => setIsOpen(false)} className="sm:hidden text-muted ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted">
              No matching actions found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-accent-cyan/40 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-muted group-hover:text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-night-950/70 border-t border-white/5 text-[11px] text-muted font-mono">
          <span>Navigate with arrows</span>
          <span>Press [Enter] to select</span>
        </div>
      </div>
    </div>
  );
}
