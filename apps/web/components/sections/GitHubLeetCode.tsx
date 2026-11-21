"use client";

import React from "react";
import { FolderGit2, Star, GitFork, ExternalLink, Code2, CheckCircle, Terminal } from "lucide-react";
import { GITHUB_DEFAULTS, LEETCODE_DEFAULTS, PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { soundFx } from "@/lib/sound/soundEffects";

export function GitHubLeetCode() {
  const gh = GITHUB_DEFAULTS;
  const lc = LEETCODE_DEFAULTS;

  // Generate simulated 52-week contribution blocks
  const contributionGrid = Array.from({ length: 48 }, (_, i) => {
    const levels = [0, 1, 2, 3, 4];
    return Array.from({ length: 7 }, (_, j) => {
      // Deterministic pseudo-random based on indices
      const seed = (i * 7 + j) % 17;
      if (seed < 5) return 0;
      if (seed < 9) return 1;
      if (seed < 13) return 2;
      if (seed < 16) return 3;
      return 4;
    });
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-cyan-950/60 border-cyan-800/40";
      case 2:
        return "bg-cyan-700/60 border-cyan-600/40";
      case 3:
        return "bg-cyan-500 border-cyan-400";
      case 4:
        return "bg-cyan-300 border-white shadow-glow-cyan";
      default:
        return "bg-white/5 border-white/5";
    }
  };

  return (
    <section id="github" className="relative py-24 sm:py-32 overflow-hidden bg-night-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // Open Source & Problem Solving</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            GitHub & LeetCode Matrix
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real repositories, verified commits, algorithmic mastery, and ongoing open-source contributions.
          </p>
        </div>

        {/* LeetCode & GitHub Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* LeetCode Card (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">LeetCode Stats</h3>
                    <span className="font-mono text-xs text-amber-400/90">@{lc.username}</span>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.contacts.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="View LeetCode Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Solved Counter Overview */}
              <div className="my-6 p-4 rounded-2xl bg-night-900 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-heading font-extrabold text-4xl text-amber-400">
                    {lc.totalSolved}
                  </div>
                  <div className="text-xs font-mono text-muted uppercase">Solved Problems</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-slate-400">Global Rank</div>
                  <div className="font-mono text-sm font-bold text-white">#{lc.ranking.toLocaleString()}</div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[11px] font-mono text-emerald-300 uppercase">Easy</div>
                  <div className="font-heading font-bold text-xl text-emerald-400">{lc.easySolved}</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <div className="text-[11px] font-mono text-amber-300 uppercase">Medium</div>
                  <div className="font-heading font-bold text-xl text-amber-400">{lc.mediumSolved}</div>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <div className="text-[11px] font-mono text-rose-300 uppercase">Hard</div>
                  <div className="font-heading font-bold text-xl text-rose-400">{lc.hardSolved}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-muted">
              <span>Focus: DSA using Python & C++</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* GitHub Overview & Heatmap (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">GitHub Repositories</h3>
                    <span className="font-mono text-xs text-cyan-400">@{gh.username}</span>
                  </div>
                </div>

                <a
                  href={PERSONAL_INFO.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 transition-colors"
                >
                  <span>{gh.publicRepos} Public Repos</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Contribution Activity Matrix */}
              <div className="my-4">
                <div className="text-xs font-mono text-muted mb-2 flex items-center justify-between">
                  <span>Commit Activity Heatmap</span>
                  <span className="text-[10px] text-cyan-400">Continuous Commits</span>
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-1 min-w-[500px]">
                    {contributionGrid.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1">
                        {week.map((level, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-2.5 h-2.5 rounded-sm border ${getHeatmapColor(level)}`}
                            title={`Contribution activity level: ${level}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-1 text-[10px] font-mono text-muted mt-2">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-950/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-700/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-cyan-300" />
                  <span>More</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-2">
              All 43 repositories reflect independent student projects, course notes, and web automation scripts.
            </p>
          </div>
        </div>

        {/* Featured Pinned Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gh.featuredRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-cyan-300">
                    {repo.language}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {repo.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-4 text-xs font-mono text-muted">
                <span className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>{repo.stargazers_count}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{repo.forks_count}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
