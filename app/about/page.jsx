import PageShell from "@/components/common/PageShell";
import Profile from "@/components/sections/Profile";
import WorkProcess from "@/components/sections/WorkProcess";
import Testimonial from "@/components/sections/Dynamic";
import WorkTogether from "@/components/sections/WorkTogether";
import { aboutData, experienceTimeline, absoluteUrl } from "@/data/site";

export const metadata = {
  title: "About Ali Khan",
  description:
    "Ali Khan is an AI Automation & Digital Solutions Specialist. Professional since 2025: front-end development at Webistic Marketing Solutions, Google Ads management and AI voice agent builds.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <PageShell heroShape>
      {/* Reuse the original Picto profile card for page context */}
      <Profile compact />

      {/* Experience timeline — same picto-card language */}
      <section id="experience" className="section-padding pt-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="sub-title">Experience</span>
          <h2 className="section-title mt-3">
            My Professional{" "}
            <span className="gradient-text">Journey</span>
          </h2>

          <ol className="mt-10 space-y-6">
            {experienceTimeline.map((x) => (
              <li key={x.role} className="picto-card p-8">
                <span className="tag-chip">{x.period}</span>
                <h3 className="mt-3 text-lg font-bold">{x.role}</h3>
                <p className="text-gray text-sm">{x.org}</p>
                <ul className="text-gray mt-4 list-disc space-y-1 pl-5 text-sm">
                  {x.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <p className="text-gray mt-8 text-xs italic">
            Additional verified details (location: {""}
            {aboutData.facts.find((f) => f.label === "Based in")?.value}) will
            be published once supplied.
          </p>
        </div>
      </section>

      <WorkProcess />
      <Testimonial />
      <WorkTogether />
    </PageShell>
  );
}
