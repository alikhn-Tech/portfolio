import PageShell from "@/components/common/PageShell";
import Profession from "@/components/sections/Profession";
import ToolsLogos from "@/components/sections/ToolsLogos";
import WorkTogether from "@/components/sections/WorkTogether";
import { absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Expertise & Services",
  description:
    "Ali Khan's expertise: AI automation & AI agents, n8n workflow automation, WhatsApp chatbots, voice AI calling agents, web development, Google Ads and digital growth solutions.",
  alternates: { canonical: absoluteUrl("/expertise") },
};

export default function ExpertisePage() {
  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Expertise</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            Services &amp; <span className="gradient-text">Capabilities</span>
          </h1>
          <p className="text-gray mt-4">
            Everything below is a skill I actively use on real client work —
            nothing listed here is speculative.
          </p>
        </div>
      </section>

      {/* All eight expertise cards (original Picto service grid) */}
      <Profession />

      {/* Tools & technologies — clickable official brand logos */}
      <ToolsLogos />

      <WorkTogether />
    </PageShell>
  );
}
