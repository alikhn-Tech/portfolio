/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deployable to any static host (Netlify/Vercel/GitHub Pages).
  output: "export",
  images: {
    // Required for static export; the template uses plain <img> tags to keep
    // the original Picto visuals pixel-identical.
    unoptimized: true,
  },
  eslint: {
    // Lint is run explicitly via `npm run lint`; don't silently skip during build.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
