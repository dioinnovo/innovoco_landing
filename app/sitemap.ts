import type { MetadataRoute } from "next";
import { getPublishedArticlesForSitemap } from "@/lib/services/sanity";

const baseUrl = "https://innovoco.com";

function entry(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap[0] {
  return {
    url: `${baseUrl}${path}`,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticlesForSitemap();

  const staticPages: MetadataRoute.Sitemap = [
    entry("/", { changeFrequency: "weekly", priority: 1 }),
    entry("/services", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/services/ai-strategy-consulting", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/services/data-engineering-modernization", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/services/ai-implementation", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/services/managed-ai-services", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/solutions/industries/healthcare", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/solutions/industries/financial-services", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/solutions/industries/manufacturing", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/solutions/industries/retail", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/solutions/industries/construction", { changeFrequency: "monthly", priority: 0.9 }),
    entry("/case-studies", { changeFrequency: "weekly", priority: 0.7 }),
    entry("/projects/ai-discovery-workshop", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/blog", { changeFrequency: "weekly", priority: 0.85 }),
    entry("/webinars", { changeFrequency: "monthly", priority: 0.55 }),
    entry("/careers", { changeFrequency: "weekly", priority: 0.6 }),
    entry("/partners", { changeFrequency: "monthly", priority: 0.5 }),
    entry("/press", { changeFrequency: "monthly", priority: 0.5 }),
    entry("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/terms", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/accessibility", { changeFrequency: "yearly", priority: 0.3 }),
    entry("/site-map", { changeFrequency: "monthly", priority: 0.25 }),
    entry("/ai-workshop-prep", { changeFrequency: "monthly", priority: 0.45 }),
    entry("/ai-workshop-one-pager", { changeFrequency: "monthly", priority: 0.45 }),
    entry("/llms.txt", { changeFrequency: "monthly", priority: 0.35 }),
  ];

  const blogEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogEntries];
}
