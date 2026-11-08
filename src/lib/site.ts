/**
 * Single source of truth for personal details, links and deployment settings.
 * Edit this file — not the components — to update the site.
 */

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

/**
 * Set NEXT_PUBLIC_BASE_PATH when the site is served from a sub-path, e.g.
 * GitHub Pages project sites (`/my-repo`). Empty for Vercel or a custom domain.
 */
export const BASE_PATH = trimTrailingSlash(
  process.env.NEXT_PUBLIC_BASE_PATH ?? "",
);

/** Prefix a file that lives in `public/` with the configured base path. */
export function asset(path: string) {
  return `${BASE_PATH}/${path.replace(/^\/+/, "")}`;
}

const vercelUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;

/** Canonical origin, used for metadata, the sitemap and structured data. */
export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
);

export const SITE = {
  name: "Ali Khan",
  role: "Junior Software Engineer",
  company: "Webistic Marketing Solutions",
  companyUrl: "https://webistic.co/",
  email: "alikhn.contact@gmail.com",
  phoneDisplay: "+92 321 5720722",
  whatsappUrl: "https://wa.me/923215720722",
  linkedinUrl: "https://www.linkedin.com/in/alikhan-tech",
  /** File inside `public/` used for the hero portrait. */
  photo: "ali-khan.jpg",
  /** File inside `public/` offered by the "Download Resume" button. */
  resume: "ali-khan-resume.pdf",
  /** Filename the browser saves the resume as. */
  resumeFilename: "Ali-Khan-Resume.pdf",
  description:
    "Ali Khan is a Junior Software Engineer and Co-Founder at Webistic Marketing Solutions, working across web development, AI automation, and Google Ads.",
  keywords: [
    "Ali Khan",
    "Junior Software Engineer",
    "Webistic Marketing Solutions",
    "web development",
    "Next.js developer",
    "AI automation",
    "n8n",
    "WhatsApp automation",
    "Google Ads",
    "portfolio",
  ],
} as const;
