"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Sparkles, Video, Layout, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { soundFx } from "@/lib/sound/soundEffects";

interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  skills: string[];
  icon: React.ElementType;
  accent: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Engineering",
    tag: "Core Specialty",
    description:
      "Architecting robust, end-to-end web applications with Next.js 15, React 19, Node.js, PHP, and MongoDB. Secure session management, resilient APIs, and seamless database integration.",
    skills: ["Next.js 15", "React 19", "MongoDB", "PHP Auth", "REST APIs"],
    icon: Code,
    accent: "from-orange-500 to-amber-500",
  },
  {
    id: "ai-systems",
    title: "Generative AI & Agent Systems",
    tag: "Google Ambassador",
    description:
      "Building practical AI solutions powered by the Google Gemini API. Designing structured prompt pipelines, RAG retrieval architectures, and interactive AI agent workflows for real-world impact.",
    skills: ["Google Gemini API", "RAG Pipelines", "Prompt Engineering", "Multi-Agent Concepts"],
    icon: Sparkles,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    id: "creative-brand",
    title: "Creative Tech & Digital Brand",
    tag: "Creator & Founder",
    description:
      "Spearheading SHUDH DESI (e-commerce for Northeast Indian snacks) and producing authentic tech vlogs on YouTube. Experienced in campus workshop leadership and developer marketing.",
    skills: ["YouTube Tech Brand", "Community Mentorship", "E-Commerce", "Digital Marketing"],
    icon: Video,
    accent: "from-rose-500 to-orange-500",
  },
  {
    id: "uiux-engineering",
    title: "UI/UX & Responsive Design",
    tag: "Design Systems",
    description:
      "Crafting pixel-perfect, human-centric user experiences inspired by award-winning Dribbble & Figma standards. Fluid animations, modern glassmorphism, and flawless mobile responsiveness.",
    skills: ["Glassmorphism", "Framer Motion", "Tailwind CSS", "Mobile-First UX"],
    icon: Layout,
    accent: "from-purple-500 to-pink-500",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative rounded-t-[44px] sm:rounded-t-[60px] bg-[#0c0d14] text-white pt-24 pb-32 -mt-10 sm:-mt-14 z-20 shadow-[0_-25px_60px_rgba(0,0,0,0.35)] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Services & Expertise</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white max-w-xl leading-tight">
              Crafting Digital Products That <span className="coral-gradient-text">Matter</span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
            Bridging rigorous software engineering with Google-backed AI adoption and authentic creator storytelling from Tripura, India.
          </p>
        </div>

        {/* 4-Card Auto-Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card-pro p-7 rounded-3xl flex flex-col justify-between group hover:border-orange-500/30 relative overflow-hidden"
              >
                {/* Top Subtle Gradient Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accent} p-[1.5px] shadow-sm`}
                    >
                      <div className="w-full h-full bg-night-900 rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Badges & Footer */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors pt-2 group/btn"
                  >
                    <span>Discuss Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
