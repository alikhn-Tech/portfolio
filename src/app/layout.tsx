import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  DEFAULT_OG_IMAGE,
  personNode,
  serializeJsonLd,
  websiteNode,
} from "@/lib/seo";
import { SITE, SITE_URL, asset } from "@/lib/site";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const title = `${SITE.name} | ${SITE.role}`;
const socialImage = asset("og-image.png");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: `${SITE.name} — Portfolio`,
  authors: [{ name: SITE.name, url: SITE.linkedinUrl }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [...SITE.keywords],
  // No `alternates.canonical` here on purpose: a canonical set in the root
  // layout is inherited by every route, which would point /blog, article
  // pages and 404s at the homepage. Each page declares its own.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
  icon: [{ url: asset("ali-khan-logo.png"), type: "image/png" }],
  shortcut: [{ url: asset("ali-khan-logo.png"), type: "image/png" }],
  apple: [{ url: asset("ali-khan-logo.png"), type: "image/png" }],
},
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
    images: [{ ...DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
    images: [socialImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * One entity graph shared by every page: the site and the person who owns it.
 * Pages reference these nodes by `@id` (see /blog and /blog/[slug]) instead of
 * repeating the data, so there is a single source of truth.
 */
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [websiteNode, personNode],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <ScrollReveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteGraph) }}
        />
      </body>
    </html>
  );
}
