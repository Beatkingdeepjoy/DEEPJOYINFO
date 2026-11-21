export interface Project {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  tech: string[];
  category: 'Full Stack' | 'Frontend' | 'AI & Automation' | 'E-Commerce';
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  progress: number;
  order: number;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  architectureDiagram?: string;
  createdAt?: string;
}

export interface Post {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  views?: number;
  publishedAt: string;
  coverImage?: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  body: string;
  type: 'contact' | 'collab';
  status: 'unread' | 'read' | 'archived';
  createdAt?: string;
}

export interface GuestbookEntry {
  id?: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
  avatarUrl?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  createdAt: string;
}

export interface SystemSettings {
  showPhoneInCv: boolean;
  featuredVideoId: string;
  socials: {
    github: string;
    linkedin: string;
    youtube: string;
    leetcode: string;
    emailDeveloper: string;
    emailCollab: string;
  };
  announcement?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
  likeCount?: string;
}

export interface YouTubeStats {
  channelId: string;
  channelTitle: string;
  customUrl: string;
  subscriberCount: number | string;
  videoCount: number;
  viewCount: number | string;
  latestVideos: YouTubeVideo[];
  popularVideos: YouTubeVideo[];
  isFallback?: boolean;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubStats {
  username: string;
  publicRepos: number;
  featuredRepos: GitHubRepo[];
  totalStars: number;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
