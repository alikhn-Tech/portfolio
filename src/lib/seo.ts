import { BASE_PATH, SITE, SITE_URL } from "./site";

/**
 * Absolute URL for a public path, respecting the configured base path.
 * The homepage keeps its trailing slash so canonicals and sitemap `<loc>`
 * values match exactly.
 */
export function absoluteUrl(pathname = "/") {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${BASE_PATH}${clean}`;
}

/** Site-wide fallback social image (1200×630, in `public/`). */
export const DEFAULT_OG_IMAGE = {
  url: `${BASE_PATH}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.role}`,
} as const;

/** Stable node identifiers so pages can cross-reference one entity graph. */
export const PERSON_ID = `${SITE_URL}${BASE_PATH}/#person`;
export const WEBSITE_ID = `${SITE_URL}${BASE_PATH}/#website`;

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.description,
  url: absoluteUrl("/"),
  email: `mailto:${SITE.email}`,
  image: `${SITE_URL}${BASE_PATH}/${SITE.photo}`,
  sameAs: [SITE.linkedinUrl],
  worksFor: {
    "@type": "Organization",
    name: SITE.company,
    url: SITE.companyUrl,
  },
  knowsAbout: [
    "Web development",
    "Next.js",
    "React",
    "AI automation",
    "n8n",
    "WhatsApp automation",
    "Google Ads",
  ],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
};

/**
 * Serialize JSON-LD for inline injection. `<` is escaped so article titles can
 * never break out of the `<script>` element.
 */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/** Schema.org BreadcrumbList from ordered `[name, path]` pairs. */
export function breadcrumbList(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
