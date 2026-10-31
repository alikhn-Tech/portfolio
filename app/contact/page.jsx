import PageShell from "@/components/common/PageShell";
import Contact from "@/components/sections/Contact";
import { absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Contact Ali Khan",
  description:
    "Get in touch with Ali Khan — AI Automation & Digital Solutions Specialist. Discuss AI agents, workflow automation, web development or Google Ads projects.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Contact</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h1>
          <p className="text-gray mt-4">
            Tell me about your business and what you want to automate, build or
            grow. I&apos;ll respond with a clear plan.
          </p>
        </div>
      </section>

      {/* Original Picto contact section (form + info) */}
      <Contact showHeading={false} />
    </PageShell>
  );
}
