import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "utmnj4rd";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const readToken = process.env.SANITY_API_READ_TOKEN;

/**
 * The blog degrades gracefully: without a project ID and dataset the site
 * still builds, it just renders an empty blog.
 */
export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId as string,
      dataset: dataset as string,
      apiVersion,
      // The CDN only serves published, public content; a token means a private
      // dataset, which must be queried directly.
      useCdn: !readToken,
      perspective: "published",
      ...(readToken ? { token: readToken } : {}),
    })
  : null;

export interface SanityImage {
  asset?: { _ref?: string };
  alt?: string;
}

const imageBuilder = sanityClient
  ? createImageUrlBuilder(sanityClient)
  : null;

/** Absolute CDN URL for an image, cropped to the requested box. */
export function imageUrlFor(
  source: SanityImage | null | undefined,
  { width = 1200, height, quality = 80 }: { width?: number; height?: number; quality?: number } = {},
) {
  if (!imageBuilder || !source?.asset?._ref) {
    return null;
  }

  let image = imageBuilder
    .image(source)
    .width(width)
    .auto("format")
    .fit("crop")
    .quality(quality);

  if (height) {
    image = image.height(height);
  }

  return image.url();
}
