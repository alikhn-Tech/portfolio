import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${BASE_PATH}/`,
      lastModified: "2026-11-07",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
