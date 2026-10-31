import {createImageUrlBuilder} from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build an optimized Sanity image URL from an asset reference.
 * Returns null when there is no image so callers can render fallbacks.
 */
export function urlForImage(source, { width, quality } = {}) {
  if (!source) return null;
  let url = builder.image(source);
  if (width) url = url.width(width);
  if (quality) url = url.quality(quality);
  return url.auto("format").fit("max").url();
}
