"use client";

import React, { useState } from "react";
import { Youtube, Bell, Play, Film, Eye, Users, Clock, Sparkles, ExternalLink } from "lucide-react";
import { YOUTUBE_CHANNEL_DEFAULTS, DAY_IN_LIFE_EVENTS, PERSONAL_INFO } from "@/lib/data/portfolio-data";
import { YouTubeVideo } from "@deepjoy/shared-types";
import { soundFx } from "@/lib/sound/soundEffects";

export function YouTubeDashboard() {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo>(
    YOUTUBE_CHANNEL_DEFAULTS.latestVideos[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const stats = YOUTUBE_CHANNEL_DEFAULTS;

  const handleSubscribe = () => {
    soundFx.playSuccess();
    setIsSubscribed(true);
    window.open(
      `https://www.youtube.com/@deepjoybhowmikofficial?sub_confirmation=1`,
      "_blank"
    );
  };

  return (
    <section id="youtube" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Youtube className="w-3.5 h-3.5" />
            <span>05 // YouTube Brand & Creator Hub</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            B.Tech Life & Late-Night Builds
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            &quot;If you&apos;re a student who loves tech, feels homesick at 2am, or wants to see real engineering life, this channel is for you.&quot;
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {["#BTechLife", "#CodingVlog", "#StudentLifeIndia", "#TripuraVlog", "#EngineeringStudent"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-rose-400/80 bg-rose-950/20 px-2.5 py-1 rounded-full border border-rose-500/20"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Channel Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="glass-card-pro p-6 rounded-3xl flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">
                {stats.subscriberCount}
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider">
                Audience Community
              </div>
            </div>
          </div>

          <div className="glass-card-pro p-6 rounded-3xl flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">
                {stats.videoCount}+
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider">
                Uploaded Episodes
              </div>
            </div>
          </div>

          <div className="glass-card-pro p-6 rounded-3xl flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl text-white">
                {stats.viewCount}
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider">
                Lifetime Channel Views
              </div>
            </div>
          </div>
        </div>

        {/* Main Video Cinema & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Cinema Viewport (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-card-pro shadow-2xl bg-night-950 flex items-center justify-center group">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    setIsPlaying(true);
                    soundFx.playClick();
                  }}
                  data-cursor="PLAY"
                >
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-night-950/40 backdrop-blur-[1px] group-hover:bg-night-950/20 transition-colors" />

                  {/* Glowing Play Button */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Active Video Info & Subscribe Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {activeVideo.description}
                </p>
              </div>

              {/* Subscribe Bell Button */}
              <button
                onClick={handleSubscribe}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-5 py-3 rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all flex-shrink-0 ${
                  isSubscribed
                    ? "bg-white/10 text-white border border-white/20"
                    : "bg-rose-600 hover:bg-rose-500 text-white shadow-glow hover:scale-105 active:scale-95"
                }`}
              >
                <Bell className={`w-4 h-4 ${isSubscribed ? "" : "animate-bounce"}`} />
                <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
              </button>
            </div>
          </div>

          {/* Side Video Playlist (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-base text-white mb-2 flex items-center space-x-2">
              <Film className="w-4 h-4 text-rose-400" />
              <span>Episodes & Campus Vlogs</span>
            </h4>

            {[...stats.latestVideos, ...stats.popularVideos].map((video) => (
              <button
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  setIsPlaying(false);
                  soundFx.playClick();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`w-full p-3 rounded-2xl text-left transition-all flex items-center space-x-3 border ${
                  activeVideo.id === video.id
                    ? "bg-rose-950/30 border-rose-500/50 shadow-glow"
                    : "glass-panel hover:bg-white/5 border-white/5"
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-20 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-xs text-white truncate">
                    {video.title}
                  </h5>
                  <span className="text-[10px] font-mono text-muted block mt-1">
                    {video.viewCount} views • {video.publishedAt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Day in My Life Mini Timeline */}
        <div className="glass-card-pro p-8 rounded-3xl">
          <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Day In The Life // Tripura Engineering Rhythm</span>
          </div>
          <h3 className="font-heading font-bold text-2xl text-white mb-6">
            A Typical Day of a B.Tech Student & Creator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DAY_IN_LIFE_EVENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between"
              >
                <div className="font-mono text-xs font-bold text-cyan-300 mb-2">
                  {item.time}
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-white mb-1">
                    {item.title}
                  </h5>
                  <p className="text-xs text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
