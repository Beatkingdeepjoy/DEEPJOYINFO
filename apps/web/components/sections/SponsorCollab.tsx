"use client";

import React, { useState } from "react";
import { Handshake, Download, Send, CheckCircle, Sparkles, Building, Mail, DollarSign } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export function SponsorCollab() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    contactName: "",
    email: "",
    campaignType: "YouTube Integration",
    budget: "₹10,000 - ₹25,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setSubmitted(true);
  };

  return (
    <section id="collab" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-violet font-mono text-xs uppercase tracking-widest mb-4">
            <Handshake className="w-3.5 h-3.5 text-accent-cyan" />
            <span>07 // Brand Partnerships</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Sponsor & Collaborate
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Partner with Deepjoy Bhowmik to reach ambitious engineering students, budding developers, and tech audiences across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Media Kit & Demographic Insights (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Media Kit Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-violet to-accent-cyan p-[1.5px]">
                  <div className="w-full h-full bg-night-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Creator Media Kit
                  </h3>
                  <span className="font-mono text-xs text-muted">2026 Edition</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Download the verified sponsor media deck including channel demographics, engagement benchmarks, past campus initiatives, and partnership formats.
              </p>

              {/* Media Kit Stats */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono py-1.5 border-b border-white/5">
                  <span className="text-muted">Primary Audience</span>
                  <span className="text-white font-semibold">18-24 B.Tech Students & Tech Enthusists</span>
                </div>
                <div className="flex justify-between text-xs font-mono py-1.5 border-b border-white/5">
                  <span className="text-muted">Geographic Reach</span>
                  <span className="text-white font-semibold">Pan-India (Focus on Northeast & Tier 2/3)</span>
                </div>
                <div className="flex justify-between text-xs font-mono py-1.5 border-b border-white/5">
                  <span className="text-muted">Inquiry Desk</span>
                  <span className="text-cyan-300 font-semibold">{PERSONAL_INFO.contacts.collabEmail}</span>
                </div>
              </div>

              {/* Download Media Kit Button */}
              <a
                href="/media-kit.pdf"
                download="Deepjoy_Bhowmik_MediaKit_2026.pdf"
                onClick={() => soundFx.playClick()}
                className="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all hover:border-cyan-400/50"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Media Kit (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Proposal Transmitted
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you! Your collaboration details have been forwarded to{" "}
                    <span className="text-cyan-300 font-mono">{PERSONAL_INFO.contacts.collabEmail}</span>. Deepjoy or his management team will respond within 24-48 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">
                    Submit a Partnership Proposal
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mb-6">
                    Direct channel for brands, campus tech events, software sponsorships, and contract engineering.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech, TechFest ICFAI"
                        className="w-full px-4 py-3 rounded-xl bg-night-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl bg-night-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                        Business Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="partner@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-night-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                        Campaign Format
                      </label>
                      <select
                        value={formData.campaignType}
                        onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-night-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="YouTube Integration">YouTube Dedicated / Integration</option>
                        <option value="Campus Workshop">Campus Workshop / Keynote (Gemini AI)</option>
                        <option value="Web Development Contract">Web Development Contract</option>
                        <option value="Product Review">Developer Tooling Review</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted mb-1.5 uppercase">
                      Campaign Details & Scope
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the scope, deliverables, timeline, and expectations..."
                      className="w-full px-4 py-3 rounded-xl bg-night-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-bold text-sm tracking-wide shadow-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Sponsorship Proposal</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
