import type { MetadataRoute } from "next";
import { getPublishedPrograms } from "@/lib/data/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const programs = getPublishedPrograms().map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/programs`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...programs,
  ];
}
