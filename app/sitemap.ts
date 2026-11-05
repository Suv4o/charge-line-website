import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: site.updated,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [page("", 1), page("/support", 0.7), page("/privacy", 0.4), page("/terms", 0.4)];
}
