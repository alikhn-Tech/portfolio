import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import WorkTogether from "@/components/sections/WorkTogether";
import { blogPosts, absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Blog",
  description:
    "Insights from Ali Khan on AI agents, n8n workflow automation, WhatsApp chatbots, web development and performance marketing. Articles publish as they are written.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogPage() {
  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Blog</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            Writing On <span className="gradient-text">AI &amp; Automation</span>
          </h1>
        </div>
      </section>

      <section id="blogs" className="section-padding">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {blogPosts.length === 0 ? (
            <div className="picto-card p-10 text-center sm:p-14">
              <i
                className="fa-regular fa-pen-to-square text-5xl text-[rgba(133,52,234,0.35)]"
                aria-hidden="true"
              />
              <h2 className="section-title mt-6 text-2xl">
                No articles published yet
              </h2>
              <p className="text-gray mx-auto mt-3 max-w-xl text-sm leading-relaxed">
                I&apos;m preparing my first posts covering AI voice agents, n8n
                workflow automations, WhatsApp chatbots and Google Ads practice.
                This page stays honest — no placeholder or filler articles are
                published. Check back soon, or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--main-color)] hover:underline"
                >
                  ask me directly
                </Link>{" "}
                about a topic you&apos;d like covered.
              </p>
              <span className="pending-chip mt-6 inline-block">
                Content pending
              </span>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article key={post.slug} className="picto-card p-8">
                  <span className="tag-chip">{post.category}</span>
                  <h2 className="mt-3 text-lg font-bold">{post.title}</h2>
                  <p className="text-gray mt-2 text-sm">{post.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <WorkTogether />
    </PageShell>
  );
}
