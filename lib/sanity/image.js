import {createImageUrlBuilder} from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build an optimized Sanity image URL from an asset reference.
 * Returns null when there is no image so callers can render fallbacks.
 */
export function urlForImage(source, { width, quality } = {}) {
  if (!source) return null;

  // GROQ projections may return a pre-resolved image object like
  // { url, altText, alt } instead of a full asset reference. In that case
  // the URL is already built — pass it through (applying sizing/format
  // params via the CDN query string) instead of the Sanity builder, which
  // only accepts {_type:"image"} refs or raw asset ids/URLs.
  if (typeof source === "object" && typeof source.url === "string") {
    const img = new URL(source.url);
    if (width) img.searchParams.set("w", String(width));
    if (quality) img.searchParams.set("q", String(quality));
    img.searchParams.set("auto", "format");
    img.searchParams.set("fit", "max");
    return img.toString();
  }

  let url = builder.image(source);
  if (width) url = url.width(width);
  if (quality) url = url.quality(quality);
  return url.auto("format").fit("max").url();
}
