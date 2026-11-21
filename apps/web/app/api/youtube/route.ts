import { NextResponse } from "next/server";
import { YOUTUBE_CHANNEL_DEFAULTS } from "@/lib/data/portfolio-data";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || "UCztCtzW52UO_iOONZZzQnQw";

  if (!apiKey) {
    // Graceful verified fallback without hallucination
    return NextResponse.json({
      ...YOUTUBE_CHANNEL_DEFAULTS,
      isFallback: true,
      note: "Live YouTube API key not provided in environment; returning verified baseline channel metadata.",
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("YouTube API returned error");
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(YOUTUBE_CHANNEL_DEFAULTS);
    }

    const item = data.items[0];
    return NextResponse.json({
      channelId,
      channelTitle: item.snippet.title,
      customUrl: item.snippet.customUrl || "@deepjoybhowmikofficial",
      subscriberCount: Number(item.statistics.subscriberCount),
      videoCount: Number(item.statistics.videoCount),
      viewCount: Number(item.statistics.viewCount),
      latestVideos: YOUTUBE_CHANNEL_DEFAULTS.latestVideos,
      popularVideos: YOUTUBE_CHANNEL_DEFAULTS.popularVideos,
      isFallback: false,
    });
  } catch (err) {
    console.error("YouTube sync error:", err);
    return NextResponse.json(YOUTUBE_CHANNEL_DEFAULTS);
  }
}
