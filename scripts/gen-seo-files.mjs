#!/usr/bin/env node
/**
 * Generates public/sitemap.xml and public/robots.txt for the static export.
 *
 * Usage:  node scripts/gen-seo-files.mjs
 *
 * Reads NEXT_PUBLIC_SITE_URL from the environment (or .env.local). If no
 * domain is configured, it writes clearly-marked placeholder files that must
 * be regenerated once the production domain exists. Run automatically as part
 * of `npm run build`.
 */
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local manually (avoids adding a dotenv dependency).
function loadEnvLocal() {
  const p = resolve(root, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", priority: "1.0", freq: "weekly" },
  { path: "/about", priority: "0.9", freq: "monthly" },
  { path: "/expertise", priority: "0.9", freq: "monthly" },
  { path: "/projects", priority: "0.9", freq: "weekly" },
  { path: "/case-studies", priority: "0.8", freq: "weekly" },
  { path: "/blog", priority: "0.7", freq: "weekly" },
  { path: "/contact", priority: "0.8", freq: "monthly" },
];

if (!SITE) {
  console.warn(
    "\n⚠️  NEXT_PUBLIC_SITE_URL is not set — writing PLACEHOLDER sitemap.xml / robots.txt.\n" +
      "   Supply your production domain in .env.local and re-run before launch.\n",
  );
}

const base = SITE; // "" when unset -> flagged placeholders

const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${base}${r.path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n    <changefreq>${r.freq}</changefreq>` +
      `\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ${base ? "" : "PLACEHOLDER — regenerate with NEXT_PUBLIC_SITE_URL set to your production domain"} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Keep framework internals out of the index",
  "Disallow: /_next/",
  "",
  base ? `Sitemap: ${base}/sitemap.xml` : "# Sitemap URL pending: set NEXT_PUBLIC_SITE_URL and rebuild",
  `# Host: ${base || "PENDING — set NEXT_PUBLIC_SITE_URL"}`,
  "",
].join("\n");

writeFileSync(resolve(root, "public/sitemap.xml"), sitemap);
writeFileSync(resolve(root, "public/robots.txt"), robots);
console.log("✓ wrote public/sitemap.xml and public/robots.txt");
