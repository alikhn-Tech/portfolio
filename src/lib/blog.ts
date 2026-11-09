import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient, type SanityImage } from "./sanity";

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  coverImage?: SanityImage | null;
}

export interface PostDetail extends PostSummary {
  body: PortableTextBlock[];
}

/** Fields shared by the listing and the article page. */
const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage { asset, alt }
`;

/**
 * Posts are fetched at build time (the site is a static export). A Sanity
 * webhook firing a Vercel Deploy Hook is what publishes new content.
 */
export async function getPosts(): Promise<PostSummary[]> {
  if (!sanityClient) {
    return [];
  }

  try {
    const posts = await sanityClient.fetch<PostSummary[]>(
      // `perspective: "published"` already hides drafts from the API; the
      // `_id` filter is defence in depth for tokens that can read drafts.
      `*[
        _type == "post"
        && !(_id in path("drafts.**"))
        && defined(slug.current)
        && defined(publishedAt)
      ] | order(publishedAt desc) { ${POST_FIELDS} }`,
    );

    return posts.filter((post) => Boolean(post.slug?.trim()));
  } catch (error) {
    // A Sanity outage should not break the build; log and ship without posts.
    console.warn("[blog] Could not reach Sanity, building without posts.", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch<PostDetail | null>(
      `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS}, body }`,
      { slug },
    );
  } catch (error) {
    console.warn(`[blog] Could not load post "${slug}".`, error);
    return null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
}

/** Deterministic date formatting so builds don't vary by machine timezone. */
export function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}
