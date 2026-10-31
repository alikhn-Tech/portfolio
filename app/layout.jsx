import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/work-sans/800.css";
import "./globals.css";

import { siteConfig, absoluteUrl } from "@/data/site";

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: siteConfig.title,
    template: "%s | Ali Khan",
  },
  description: siteConfig.description,
  keywords: [
    "Ali Khan",
    "AI Automation Specialist",
    "AI Agents",
    "Workflow Automation",
    "n8n",
    "WhatsApp Chatbot",
    "Voice AI Agent",
    "Web Developer",
    "Google Ads",
    "Next.js Developer",
  ],
  authors: [{ name: "Ali Khan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: "Ali Khan — AI Automation & Digital Solutions Specialist",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@alikhan",
  },
  robots: { index: true, follow: true },
};

// Font Awesome CDN for the original Picto icon set (loaded client-side only).
const FONT_AWESOME_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Ali Khan",
      jobTitle: "AI Automation & Digital Solutions Specialist",
      description: siteConfig.description,
      url: absoluteUrl("/"),
      knowsAbout: [
        "AI Automation",
        "AI Agents",
        "Workflow Automation",
        "n8n",
        "WhatsApp Chatbots",
        "Voice AI",
        "Web Development",
        "Google Ads",
      ],
      sameAs: Object.values(siteConfig.socials).filter(Boolean),
    },
    {
      "@type": "ProfessionalService",
      name: "Ali Khan — AI Automation & Digital Solutions",
      provider: { "@type": "Person", name: "Ali Khan" },
      areaServed: "Worldwide",
      serviceType: [
        "AI Automation",
        "Workflow Automation",
        "Web Development",
        "Performance Marketing",
      ],
      url: absoluteUrl("/expertise"),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={FONT_AWESOME_CDN} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
