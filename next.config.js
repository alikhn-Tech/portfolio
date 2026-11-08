/**
 * Sub-path hosting (GitHub Pages, a repo folder, etc.) is opt-in:
 *   NEXT_PUBLIC_BASE_PATH=/my-repo npm run build
 * Leave it unset for Vercel, a custom domain, or local development.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

/**
 * The blog is rendered on demand with incremental revalidation, so a new post
 * appears within `revalidate` seconds of publishing — no rebuild, and the build
 * works even while the dataset is empty.
 *
 * `STATIC_EXPORT=1` flips back to a fully static export for GitHub Pages. That
 * mode requires at least one published post, because Next refuses to export a
 * dynamic route that prerenders nothing.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
