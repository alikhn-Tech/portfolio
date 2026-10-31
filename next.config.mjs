/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: "export"` was removed intentionally. Static export is
  // incompatible with on-demand revalidation / ISR, which is what makes
  // Sanity-published blog articles appear on the live site automatically,
  // without redeploying. The site now runs as a server-enabled Next.js app
  // (deployed on Vercel) with ISR + webhook revalidation for the blog.
  images: {
    // The template uses plain <img> tags with Sanity CDN URLs to keep the
    // original Picto visuals pixel-identical.
    unoptimized: true,
  },
  eslint: {
    // Lint is run explicitly via `npm run lint`; don't silently skip during build.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
