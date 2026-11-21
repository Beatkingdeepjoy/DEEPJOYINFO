"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { PERSONAL_INFO, PROJECTS } from "@/lib/data/portfolio-data";

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: "init",
      output: (
        <span className="text-cyan-400">
          DeepjoyOS v2.4 [Agartala, Tripura Kernel]\nType &apos;help&apos; to view available commands.
        </span>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Global toggle listener: pressing backquote (`) or Cmd/Ctrl+Shift+T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
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

  useEffect(() => {
    if (isOpen) {
      soundFx.playClick();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    soundFx.playHover();
    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="space-y-1 text-slate-300">
            <div>Available Commands:</div>
            <div>• <span className="text-cyan-400 font-bold">whoami</span> : Identity & bio overview</div>
            <div>• <span className="text-cyan-400 font-bold">projects</span> : Key engineering builds</div>
            <div>• <span className="text-cyan-400 font-bold">youtube</span> : Channel stats & student vlogger details</div>
            <div>• <span className="text-cyan-400 font-bold">hire</span> : Contact & collaboration channels</div>
            <div>• <span className="text-cyan-400 font-bold">skills</span> : Verified technical stack</div>
            <div>• <span className="text-cyan-400 font-bold">clear</span> : Clear terminal output</div>
            <div>• <span className="text-cyan-400 font-bold">exit</span> : Close terminal window</div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="text-slate-200">
            <span className="text-purple-400 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.location}
            <br />
            {PERSONAL_INFO.heroTagline}
            <br />
            Education: {PERSONAL_INFO.education.degree} ({PERSONAL_INFO.education.institution})
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1">
            {PROJECTS.map((p) => (
              <div key={p.slug} className="text-sm">
                <span className="text-emerald-400 font-bold">{p.title}</span> ({p.progress}%): {p.summary}
              </div>
            ))}
          </div>
        );
        break;

      case "youtube":
        response = (
          <div className="text-slate-200">
            Channel: <span className="text-red-400 font-bold">Deepjoy Bhowmik (@deepjoybhowmikofficial)</span>
            <br />
            Niche: B.Tech Student Life, Late Night Builds, Agartala & Northeast India Vlogs.
            <br />
            Brand Line: &quot;{PERSONAL_INFO.brandLine}&quot;
          </div>
        );
        break;

      case "hire":
        response = (
          <div className="text-slate-200">
            For Developer Enquiries: <span className="text-cyan-400">{PERSONAL_INFO.contacts.developerEmail}</span>
            <br />
            For Sponsorship & Collabs: <span className="text-purple-400">{PERSONAL_INFO.contacts.collabEmail}</span>
            <br />
            LinkedIn: {PERSONAL_INFO.contacts.linkedin}
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="text-slate-200">
            Languages: HTML, CSS, JavaScript, Python, C, C++
            <br />
            Backend & DB: PHP, API Integration, MongoDB
            <br />
            Learning Orbit: React / Next.js, TypeScript, Node.js, AI Agents
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        response = <span className="text-rose-400">Command not recognized: &apos;{cleanCmd}&apos;. Type &apos;help&apos; for list.</span>;
        break;
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output: response }]);
    setInputVal("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Terminal Easter Egg"
        data-cursor="CLI"
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-night-900/90 border border-border text-cyan-400 shadow-glow-cyan hover:scale-110 active:scale-95 transition-all backdrop-blur-md hidden md:flex items-center space-x-2"
        title="Open Terminal (Press `)"
      >
        <Terminal className="w-5 h-5" />
        <span className="text-xs font-mono font-medium pr-1">CLI</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl h-[460px] bg-night-950/95 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-night-900 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-muted ml-2 font-mono">deepjoy@agartala-core: ~</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.cmd !== "init" && (
                <div className="flex items-center space-x-2 text-cyan-300">
                  <span>❯</span>
                  <span>{item.cmd}</span>
                </div>
              )}
              <div className="pl-4 text-slate-300 whitespace-pre-wrap">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input */}
        <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-night-900/60 border-t border-white/10">
          <span className="text-cyan-400 mr-2 font-bold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'whoami', 'projects', 'youtube', 'hire'..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 font-mono text-sm"
          />
          <button type="submit" className="text-slate-400 hover:text-cyan-400" aria-label="Submit command">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
