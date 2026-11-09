import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

// components
import { Navbar, Footer } from "@/components";
import { absoluteUrl, PERSON_ID, serializeJsonLd, WEBSITE_ID } from "@/lib/seo";
import { SITE } from "@/lib/site";

// sections
import Hero from "./hero";
import Background from "./background";
import Skills from "./skills";
import Projects from "./projects";
import Workflow from "./workflow";
import Resume from "./resume";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

/** True when the file exists in `public/`. Checked per render so adding a file
 *  shows up on refresh in `next dev`, and is baked in at build time for the
 *  static export. */
function inPublic(file: string) {
  return existsSync(path.join(process.cwd(), "public", file));
}

/** The homepage is a profile page; it describes the person, not an article. */
const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absoluteUrl("/")}#profilepage`,
  url: absoluteUrl("/"),
  name: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
  inLanguage: "en",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  mainEntity: { "@id": PERSON_ID },
};

export default function Portfolio() {
  const hasPhoto = inPublic(SITE.photo);
  const hasResume = inPublic(SITE.resume);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero hasPhoto={hasPhoto} />
        <Background />
        <Skills />
        <Projects />
        <Workflow />
        <Resume hasResume={hasResume} />
        <ContactForm />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePage) }}
      />
    </>
  );
}
