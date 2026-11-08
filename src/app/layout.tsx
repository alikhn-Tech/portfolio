import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: asset("favicon.png"), type: "image/png" }],
    shortcut: [{ url: asset("favicon.png"), type: "image/png" }],
    apple: [{ url: asset("favicon.png"), type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.role}`,
      },
    ],
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.description,
  url: SITE_URL,
  email: `mailto:${SITE.email}`,
  image: `${SITE_URL}${asset(SITE.photo)}`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
