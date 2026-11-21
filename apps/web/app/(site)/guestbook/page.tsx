"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquarePlus, Send, CheckCircle2, Heart } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";

export default function GuestbookPage() {
  const [messages, setMessages] = useState([
    {
      name: "Rohit Debbarma",
      role: "ICFAI CSE Student",
      message: "The Career Glow-up Night was insane! Loved the Gemini prompt engineering session. Keep inspiring us from Tripura!",
      date: "March 2026",
    },
    {
      name: "Priya Sharma",
      role: "Developer",
      message: "Waiting eagerly for SHUDH DESI launch! Authentic Northeast snacks direct to doorstep is a game-changer.",
      date: "March 2026",
    },
    {
      name: "Aniket Roy",
      role: "Hostel Mate",
      message: "That 2 AM debugging session on your YouTube vlog was too real bro! Keep grinding!",
      date: "February 2026",
    },
  ]);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    soundFx.playSuccess();
    setMessages([
      {
        name,
        role: "Visitor",
        message: msg,
        date: "Just now",
      },
      ...messages,
    ]);
    setName("");
    setMsg("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Universe</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-violet/20 border border-accent-violet/40 text-accent-cyan font-mono text-xs">
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Community Guestbook</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
            Leave a Note for Deepjoy
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Say hello, share feedback on the YouTube vlogs, or leave a message for the creator.
          </p>
        </div>

        {/* Input Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-12">
          {submitted ? (
            <div className="flex items-center space-x-3 text-emerald-400 font-mono text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! Your note has been posted to the guestbook.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full px-4 py-3 rounded-xl bg-night-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                  Your Note / Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Share some words of encouragement or feedback..."
                  className="w-full px-4 py-3 rounded-xl bg-night-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundFx.playHover()}
                className="px-6 py-3 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-glow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </form>
          )}
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {messages.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-muted ml-2 font-mono">({item.role})</span>
                </div>
                <span className="font-mono text-muted">{item.date}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
