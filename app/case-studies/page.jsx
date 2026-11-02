import PageShell from "@/components/common/PageShell";
import CaseStudyList from "@/components/sections/CaseStudyList";
import WorkTogether from "@/components/sections/WorkTogether";
import { projects, absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Case Studies",
  description:
    "Case studies of Ali Khan's work — client websites delivered with Webistic Marketing Solutions, a Google Ads driving-school campaign that generated 55 calls in its first month, AI voice agents and n8n automations.",
  alternates: { canonical: absoluteUrl("/case-studies") },
};

// Verified results shown as metric tiles on the Google Ads case study.
const adsProject = projects.find((p) => p.slug === "google-ads-driving-school");

/* Static export + hash anchors: browsers jump to #slug natively. No 404s —
   every project slug has a matching <article id={slug}> rendered below. */
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
            Verified facts only. Results are published exactly as measured —
            no invented metrics.
          </p>
        </div>
      </section>

      {/* Featured: Google Ads case study for 7DaysReady.co.uk */}
      {adsProject && (
        <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
          <article
            id="featured-google-ads"
            className="picto-card overflow-hidden"
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-8 sm:p-10">
                <span className="tag-chip">Performance Marketing</span>
                <h2 className="mt-3 text-2xl font-bold leading-snug">
                  Driving School Google Ads —{" "}
                  <span className="gradient-text">
                    55 calls in the first month
                  </span>
                </h2>
                <p className="text-gray mt-4 leading-relaxed">
                  Client: 7DaysReady.co.uk — a UK driving school in Birmingham.
                  Campaign: Driving School Google Ads. Generated 55 calls during
                  the campaign&apos;s first month.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-5xl font-extrabold text-[var(--main-color)]">
                    55
                  </span>
                  <span className="text-gray text-sm font-medium uppercase tracking-wider">
                    Calls · Month 1
                  </span>
                </div>
                <a
                  href={adsProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-8 inline-flex text-sm"
                >
                  Visit 7daysready.co.uk
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="relative flex items-center justify-center bg-[rgba(133,52,234,0.07)] p-8 sm:p-10">
                {/* Full campaign screenshot shown with object-contain inside a
                    white evidence frame — no metrics or text are cropped. */}
                <div className="flex max-h-[560px] w-full items-center justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-white p-2 shadow-[0_20px_50px_-25px_rgba(133,52,234,0.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/case-studies/7daysready-google-ads.jpg"
                    alt="Google Ads campaign screenshot for 7DaysReady's driving school — 55 calls generated in the campaign's first month"
                    loading="lazy"
                    className="max-h-full w-full object-contain"
                  />
                </div>
                <p className="text-gray mt-4 text-center text-xs italic">
                  Campaign evidence — first month results screenshot.
                </p>
              </div>
            </div>
          </article>
        </section>
      )}

      <section id="case-studies" className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <CaseStudyList />
        </div>
      </section>

      <WorkTogether />
    </PageShell>
  );
}
