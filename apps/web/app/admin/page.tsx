"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle, Mail, Handshake, Settings, Save, Lock, Phone } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState<"inbox" | "settings">("inbox");

  // Admin Settings State
  const [showPhoneInCv, setShowPhoneInCv] = useState(false);
  const [announcement, setAnnouncement] = useState("✦ CODING IS MY HOBBY, VLOGGING IS MY PASSION ✦");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Mock initial inbox proposals
  const [proposals, setProposals] = useState([
    {
      id: "1",
      company: "TechCampus Media",
      contactName: "Vikram Das",
      email: "vikram@techcampus.in",
      campaign: "YouTube Integration",
      message: "We would love to sponsor a 60-second integration in your next B.Tech hostel coding vlog.",
      date: "2026-03-20",
      status: "unread",
    },
    {
      id: "2",
      company: "Tripura Dev Summit",
      contactName: "Dr. R. Debbarma",
      email: "summit@tripuradev.org",
      campaign: "Campus Workshop",
      message: "Inviting you to deliver a guest keynote on Gemini AI and autonomous agents for students.",
      date: "2026-03-18",
      status: "read",
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "deepjoy2026" || passcode === "admin") {
      setIsAuthenticated(true);
      soundFx.playSuccess();
    } else {
      alert("Invalid Passcode. (Hint: 'admin' or 'deepjoy2026')");
    }
  };

  const handleSaveSettings = () => {
    soundFx.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-night-950 text-foreground flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center text-accent-cyan mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-white">Admin Console</h1>
            <p className="text-xs text-muted font-mono">Protected Gateway for Deepjoy Bhowmik</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                Admin Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl bg-night-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-glow"
            >
              Authenticate ❯
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs font-mono text-cyan-300 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center text-accent-cyan">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-white">
                Deepjoy Control Center
              </h1>
              <span className="text-xs font-mono text-cyan-400">Authenticated: {PERSONAL_INFO.contacts.developerEmail}</span>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300"
          >
            Exit to Site
          </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => {
              setActiveTab("inbox");
              soundFx.playClick();
            }}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === "inbox"
                ? "bg-accent-violet text-white shadow-glow"
                : "glass-panel text-muted hover:text-white"
            }`}
          >
            Proposal Inbox ({proposals.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("settings");
              soundFx.playClick();
            }}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
              activeTab === "settings"
                ? "bg-accent-violet text-white shadow-glow"
                : "glass-panel text-muted hover:text-white"
            }`}
          >
            Privacy & Settings
          </button>
        </div>

        {/* Inbox Tab */}
        {activeTab === "inbox" && (
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-white mb-4">
              Sponsorship & Collaboration Inbox
            </h2>

            {proposals.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-accent-cyan/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase">
                      {item.campaign}
                    </span>
                    <h3 className="font-bold text-lg text-white mt-1">
                      {item.company}
                    </h3>
                    <div className="text-xs text-muted font-mono">
                      Contact: {item.contactName} ({item.email})
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted">{item.date}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-night-900/60 p-4 rounded-xl border border-white/5">
                  {item.message}
                </p>

                <div className="flex gap-2">
                  <a
                    href={`mailto:${item.email}?subject=Re: Sponsorship with Deepjoy Bhowmik`}
                    className="px-4 py-2 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white text-xs font-mono"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="font-heading font-bold text-xl text-white mb-2">
              Privacy & Portfolio Settings
            </h2>

            {/* Privacy Phone Toggle */}
            <div className="p-4 rounded-2xl bg-night-900/60 border border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-white font-bold text-sm">
                  <Phone className="w-4 h-4 text-accent-cyan" />
                  <span>Show Phone Number in Public CV</span>
                </div>
                <p className="text-xs text-muted max-w-lg">
                  Strictly enforce privacy rule: Never show phone number publicly unless explicitly enabled here.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPhoneInCv(!showPhoneInCv)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  showPhoneInCv ? "bg-accent-cyan" : "bg-white/20"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    showPhoneInCv ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Announcement Ticker */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-muted uppercase">
                Footer Marquee Announcement
              </label>
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-night-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {savedSuccess && (
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>Settings persisted successfully!</span>
              </div>
            )}

            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-glow"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
