"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, Tag, Search, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog-data";
import { soundFx } from "@/lib/sound/soundEffects";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = ["All", ...Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags)))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Insights & Student Vlogs</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
            Deepjoy&apos;s Blog & Build Logs
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Field notes on late-night code architectures, building e-commerce in Northeast India, and generative AI workshops.
          </p>
        </div>

        {/* Search & Tag Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by keywords, topics, or stack..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-night-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? "bg-accent-violet text-white shadow-glow border border-accent-violet"
                    : "bg-white/5 text-muted hover:text-white border border-white/5"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-white/10 block group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted mb-3">
                <span className="flex items-center space-x-1 text-cyan-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                {post.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
