import PageShell from "@/components/common/PageShell";
import CaseStudyList from "@/components/sections/CaseStudyList";
import WorkTogether from "@/components/sections/WorkTogether";
import { absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Case Studies",
  description:
    "Case studies of Ali Khan's work — websites, Google Ads campaigns, AI voice agents, WhatsApp chatbots and n8n automations. Full details published as they are verified.",
  alternates: { canonical: absoluteUrl("/case-studies") },
};

// Static export + hash anchors: browsers jump to #slug natively. No 404s —
// every project slug has a matching <article id={slug}> rendered below.
export default function CaseStudiesPage() {
  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Case Studies</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            Project <span className="gradient-text">Details</span>
          </h1>
          <p className="text-gray mt-4">
            Verified facts only. Where client names, live URLs or campaign
            metrics have not yet been supplied, the entry is explicitly marked{" "}
            <em>pending</em> rather than filled with invented content.
          </p>
        </div>
      </section>

      <section id="case-studies" className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <CaseStudyList />
        </div>
      </section>

      <WorkTogether />
    </PageShell>
  );
}
