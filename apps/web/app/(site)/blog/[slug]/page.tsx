import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-night-950 text-foreground pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
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

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-accent-violet/20 border border-accent-violet/40 text-xs font-mono text-cyan-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* Content Body */}
        <article className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 whitespace-pre-wrap font-sans">
            {post.content.trim()}
          </div>
        </article>

        {/* Author Bio Footer */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent-violet to-accent-cyan p-[1.5px] flex-shrink-0">
            <div className="w-full h-full bg-night-950 rounded-[14px] flex items-center justify-center font-heading font-bold text-lg text-white">
              DB
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-lg text-white">Deepjoy Bhowmik</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              B.Tech Computer Science student at ICFAI University Tripura, YouTuber, and Google Student Ambassador (Gemini AI).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
