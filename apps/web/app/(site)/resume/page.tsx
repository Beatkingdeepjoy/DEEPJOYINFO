"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Mail, MapPin, Globe, Linkedin, Github, Award, CheckCircle } from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export default function ResumePage() {
  // Respecting strict privacy: phone number is withheld by default unless enabled in admin settings
  const [showPhone] = useState(false);

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20 print:bg-white print:text-black print:pt-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Universe</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center space-x-2 transition-all"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print CV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center space-x-2 shadow-glow hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 print:border-none print:shadow-none print:p-0 print:bg-transparent">
          {/* Header */}
          <div className="border-b border-white/10 print:border-black/20 pb-8 mb-8">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white print:text-black mb-1">
              {PERSONAL_INFO.name}
            </h1>
            <p className="font-mono text-sm text-cyan-300 print:text-indigo-800 font-semibold mb-4">
              Full-Stack Developer • Google Student Ambassador (Gemini AI) • YouTuber
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-300 print:text-slate-700">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-accent-violet" />
                <span>{PERSONAL_INFO.contacts.developerEmail}</span>
              </span>
              <a
                href={PERSONAL_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-300"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={PERSONAL_INFO.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-cyan-300"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub (Beatkingdeepjoy)</span>
              </a>
              {showPhone && <span>+91 [Verified Contact]</span>}
            </div>
          </div>

          {/* Education */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white print:text-black uppercase tracking-wider border-b border-white/5 print:border-black/10 pb-2 mb-4">
              Education
            </h2>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="font-bold text-base text-white print:text-black">
                  {PERSONAL_INFO.education.degree}
                </h3>
                <span className="text-xs font-mono text-cyan-400 print:text-slate-600">
                  {PERSONAL_INFO.education.period}
                </span>
              </div>
              <p className="text-sm text-slate-300 print:text-slate-700">
                {PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.location}
              </p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white print:text-black uppercase tracking-wider border-b border-white/5 print:border-black/10 pb-2 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-white print:text-black">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-mono text-slate-300 print:text-slate-700 font-semibold">
                        {exp.company} — {exp.location}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 print:text-slate-600">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-300 print:text-slate-700">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Core Projects */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white print:text-black uppercase tracking-wider border-b border-white/5 print:border-black/10 pb-2 mb-4">
              Key Engineering Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.slug} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white print:text-black">
                      {proj.title} ({proj.progress}%)
                    </h3>
                    {proj.liveUrl && (
                      <span className="text-[11px] font-mono text-cyan-400 print:text-slate-600">
                        {proj.liveUrl}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="text-[11px] font-mono text-muted print:text-slate-500">
                    Tech: {proj.tech.join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills Matrix */}
          <section className="mb-8">
            <h2 className="font-heading font-bold text-lg text-white print:text-black uppercase tracking-wider border-b border-white/5 print:border-black/10 pb-2 mb-4">
              Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex">
                  <span className="font-bold text-white print:text-black w-36 flex-shrink-0">
                    {cat.name}:
                  </span>
                  <span className="text-slate-300 print:text-slate-700 font-mono">
                    {cat.skills.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="font-heading font-bold text-lg text-white print:text-black uppercase tracking-wider border-b border-white/5 print:border-black/10 pb-2 mb-4">
              Accreditations & Certifications
            </h2>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="flex items-start justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white print:text-black">{cert.title}</span>
                    <span className="text-muted print:text-slate-500 ml-2">({cert.issuer})</span>
                  </div>
                  <span className="font-mono text-emerald-400 print:text-emerald-700">Verified</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
