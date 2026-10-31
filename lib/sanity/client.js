import { createClient } from "@sanity/client";

// Sanity project details — public by design (read-only queries use the CDN).
export const SANITY_PROJECT_ID = "ktndwv6h";
export const SANITY_DATASET = "production";
export const SANITY_API_VERSION = "2025-07-01";

/**
 * Public client — no token. Used for published-content queries and image URLs.
 * NEVER place a write token or privileged read token here.
 */
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

/**
 * Server-only client that bypasses the CDN so freshly published content is
 * guaranteed fresh (used in generateStaticParams and the revalidate webhook).
 * Only created when SANITY_API_READ_TOKEN exists; falls back to the CDN
 * client so the site still builds without secrets configured.
 */
export function serverSanityClient() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) return sanityClient;
  return sanityClient.withConfig({ token, useCdn: false });
}
