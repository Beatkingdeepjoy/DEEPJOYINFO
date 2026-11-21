import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data/portfolio-data";
import { BLOG_POSTS } from "@/lib/data/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deepjoy.dev";

  const staticRoutes = [
    "",
    "/resume",
    "/blog",
    "/guestbook",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogRoutes = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
