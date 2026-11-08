/**
 * Sub-path hosting (GitHub Pages, a repo folder, etc.) is opt-in:
 *   NEXT_PUBLIC_BASE_PATH=/my-repo npm run build
 * Leave it unset for Vercel, a custom domain, or local development.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  output: "export",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
