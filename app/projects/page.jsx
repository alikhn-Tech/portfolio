import PageShell from "@/components/common/PageShell";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import WorkTogether from "@/components/sections/WorkTogether";
import { projects, absoluteUrl } from "@/data/site";

// The four real client websites (collaborative agency projects).
const websiteProjects = projects.filter((p) => p.category === "Web Development");

export const metadata = {
  title: "Projects & Portfolio",
  description:
    "Selected work by Ali Khan: client websites at Webistic Marketing Solutions, Google Ads for a Birmingham driving school, AI voice calling agents, WhatsApp chatbots and n8n workflow automations.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Portfolio</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray mt-4">
            Real client websites and engagements across web development,
            performance marketing and AI automation. The four website projects
            were delivered collaboratively with Webistic Marketing Solutions —
            my contribution was frontend design and UI implementation.
          </p>
        </div>
      </section>

      <section id="portfolio" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* The four client websites are collaborative agency projects —
              my contribution was frontend design & UI implementation. */}
          <p className="text-gray mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] sm:text-base">
            Selected client projects delivered with Webistic Marketing Solutions
          </p>
          {/* Cards link to /case-studies#slug — every slug has an anchor there */}
          <PortfolioGrid items={websiteProjects} />
        </div>
      </section>

      <WorkTogether />
    </PageShell>
  );
}
