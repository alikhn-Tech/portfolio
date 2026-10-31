import { sanityClient, serverSanityClient } from "./client";
import {
  BLOG_POSTS_QUERY,
  FEATURED_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_CATEGORIES_QUERY,
  postsQuery,
  postsCountQuery,
  POSTS_PER_PAGE,
} from "./queries";

// ISR: cached pages are regenerated at most every 60 seconds between
// webhook-triggered revalidations. The Sanity webhook makes publishing
// effectively instant; this is only a safety net.
export const BLOG_REVALIDATE = 60;

/** Slugs of all published posts (fresh, CDN bypassed) for static generation. */
export async function getPublishedSlugs() {
  try {
    return await serverSanityClient().fetch(BLOG_POST_SLUGS_QUERY);
  } catch (err) {
    console.error("[sanity] failed to fetch slugs:", err.message);
    return [];
  }
}

/** First page + featured post for /blog. Returns nulls on failure/empty. */
export async function getBlogOverview() {
  try {
    const [posts, featured, categories] = await Promise.all([
      sanityClient.fetch(BLOG_POSTS_QUERY),
      sanityClient.fetch(FEATURED_POST_QUERY),
      sanityClient.fetch(BLOG_CATEGORIES_QUERY),
    ]);
    return { posts, featured, categories };
  } catch (err) {
    console.error("[sanity] failed to fetch blog overview:", err.message);
    return { posts: [], featured: null, categories: [] };
  }
}

/** Paginated (and optionally category-filtered) listing + total count. */
export async function getBlogPage({ page = 1, category = null } = {}) {
  const safePage = Math.max(1, Math.trunc(Number(page)) || 1);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  try {
    const [posts, total] = await Promise.all([
      sanityClient.fetch(postsQuery(start, end, category)),
      sanityClient.fetch(postsCountQuery(category)),
    ]);
    return {
      posts,
      total,
      page: safePage,
      perPage: POSTS_PER_PAGE,
      totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
    };
  } catch (err) {
    console.error("[sanity] failed to fetch blog page:", err.message);
    return { posts: [], total: 0, page: safePage, perPage: POSTS_PER_PAGE, totalPages: 1 };
  }
}

/** A single published post by slug, or null (caller should notFound()). */
export async function getPostBySlug(slug) {
  try {
    return await sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
  } catch (err) {
    console.error("[sanity] failed to fetch post:", err.message);
    return null;
  }
}
