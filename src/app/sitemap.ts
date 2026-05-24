import type { MetadataRoute } from "next";
import { getPublishedPrograms } from "@/lib/data/programs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const programs = await getPublishedPrograms();

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/programs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    ...programs.map((program) => ({
      url: `${base}/programs/${program.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
