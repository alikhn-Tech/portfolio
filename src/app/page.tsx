import { existsSync } from "node:fs";
import path from "node:path";

// components
import { Navbar, Footer } from "@/components";
import { SITE } from "@/lib/site";

// sections
import Hero from "./hero";
import Background from "./background";
import Skills from "./skills";
import Projects from "./projects";
import Workflow from "./workflow";
import Resume from "./resume";
import ContactForm from "./contact-form";

/** True when the file exists in `public/`. Checked per render so adding a file
 *  shows up on refresh in `next dev`, and is baked in at build time for the
 *  static export. */
function inPublic(file: string) {
  return existsSync(path.join(process.cwd(), "public", file));
}

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
    </>
  );
}
