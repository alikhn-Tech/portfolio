import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { BASE_PATH, SITE_URL } from "@/lib/site";

/** Rebuild the sitemap hourly so new posts get indexed without a redeploy. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `${SITE_URL}${BASE_PATH}`;
  const posts = await getPosts();

  return [
    {
      url: `${base}/`,
      lastModified: "2026-11-08",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: posts[0]?.publishedAt ?? "2026-11-08",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
