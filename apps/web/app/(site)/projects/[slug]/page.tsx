import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/data/portfolio-data";
import { ArrowLeft, ExternalLink, FolderGit2, CheckCircle, Layers, Cpu } from "lucide-react";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Matrix</span>
        </Link>

        {/* Header Title & Badges */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent-violet/20 border border-accent-violet/40 text-accent-cyan font-mono text-xs">
              {project.category}
            </span>
            {project.slug === "shudh-desi" ? (
              <span className="px-3 py-1 rounded-full bg-accent-magenta/20 border border-accent-magenta/40 text-accent-magenta font-mono text-xs font-bold">
                80% Progress • Launching Soon
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                Production Deployed
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-xs font-bold tracking-wider uppercase flex items-center space-x-2 shadow-glow hover:scale-105 active:scale-95 transition-all"
              >
                <span>Visit Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center space-x-2 transition-all"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass-panel p-5 rounded-2xl border border-white/10">
                <div className="text-xs font-mono text-muted uppercase mb-1">{m.label}</div>
                <div className="font-heading font-bold text-lg text-cyan-300">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Problem & Solution Cards */}
        <div className="space-y-8 mb-12">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="font-heading font-bold text-2xl text-white flex items-center space-x-2">
              <span className="text-rose-400">01.</span>
              <span>The Problem Statement</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-3">
            <h2 className="font-heading font-bold text-2xl text-white flex items-center space-x-2">
              <span className="text-emerald-400">02.</span>
              <span>The Engineering Solution</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Tech Stack */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 mb-16">
          <h2 className="font-heading font-bold text-2xl text-white flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-accent-cyan" />
            <span>Technologies & Stack</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-xl bg-night-900 border border-white/10 text-xs font-mono text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          {project.architectureDiagram && (
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="text-xs font-mono text-muted uppercase">Architecture Blueprint</div>
              <pre className="p-4 rounded-xl bg-night-900 border border-white/5 font-mono text-xs text-cyan-300 overflow-x-auto">
                {project.architectureDiagram}
              </pre>
            </div>
          )}
        </div>

        {/* Next Project Teaser */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-muted uppercase">Next Project Case Study</div>
            <h3 className="font-heading font-bold text-2xl text-white">{nextProject.title}</h3>
            <p className="text-xs text-slate-400">{nextProject.summary}</p>
          </div>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="px-5 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-mono text-xs font-bold transition-all"
          >
            Explore Next ❯
          </Link>
        </div>
      </div>
    </main>
  );
}
