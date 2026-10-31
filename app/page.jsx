import PageShell from "@/components/common/PageShell";
import HashRedirect from "@/components/common/HashRedirect";
import Introduction from "@/components/sections/Introduction";
import Profile from "@/components/sections/Profile";
import WorkProcess from "@/components/sections/WorkProcess";
import Profession from "@/components/sections/Profession";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Testimonial, { HappyClients, BlogPreview } from "@/components/sections/Dynamic";
import WorkTogether from "@/components/sections/WorkTogether";
import ContactSection from "@/components/sections/Contact";
import { projects, absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Ali Khan — AI Automation & Digital Solutions Specialist",
  description:
    "Portfolio of Ali Khan: AI agents, n8n workflow automation, WhatsApp chatbots, voice AI, web development and Google Ads performance marketing.",
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <PageShell heroShape>
      {/* Legacy /#hash link support without breaking home smooth scrolling */}
      <HashRedirect />
      <Introduction />
      <HappyClients />
      <Profile />
      <WorkProcess />
      <Profession limit={4} />
      <section id="portfolio" className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="sub-title">Portfolio</span>
              <h2 className="section-title mt-3">
                Featured{" "}
                <span className="gradient-text">Projects</span>
              </h2>
            </div>
          </div>
          <div className="mt-12">
            <PortfolioGrid items={projects.slice(0, 3)} />
          </div>
        </div>
      </section>
      <Testimonial />
      <BlogPreview />
      <WorkTogether />
      <ContactSection showHeading={false} />
    </PageShell>
  );
}
