import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import WorkTogether from "@/components/sections/WorkTogether";
import PostCard, { formatDate } from "@/components/blog/PostCard";
import { getBlogPage, BLOG_REVALIDATE } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { absoluteUrl } from "@/data/site";

export const metadata = {
  title: "Blog",
  description:
    "Insights from Ali Khan on AI agents, n8n workflow automation, WhatsApp chatbots, web development and performance marketing. Articles publish as they are written.",
  alternates: { canonical: absoluteUrl("/blog") },
};

// Server-rendered with ISR — published Sanity posts appear automatically
// (webhook-triggered revalidation; 60s time-based fallback).
export const revalidate = 60;

const CATEGORY_ORDER = [
  "AI Automation",
  "AI Agents",
  "n8n & Workflow Automation",
  "WhatsApp Automation",
  "Voice AI",
  "Web Development",
  "Next.js & Web Applications",
  "Google Ads",
  "Performance Marketing",
  "Digital Growth",
];

function slugifyCategory(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function BlogPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const categorySlug = sp.category ? String(sp.category) : null;

  const { posts, total, totalPages } = await getBlogPage({
    page,
    category: categorySlug,
  });

  // Featured = first post on page 1 (listing is ordered newest-first;
  // the Studio's `featured` flag surfaces a post via its own badge too).
  const featured = page === 1 && posts.length > 0 ? posts[0] : null;
  const gridPosts = page === 1 ? posts.slice(1) : posts;

  const buildQuery = (overrides) => {
    const params = new URLSearchParams();
    const merged = {
      ...(categorySlug ? { category: categorySlug } : {}),
      ...overrides,
    };
    if (merged.page && merged.page > 1) params.set("page", String(merged.page));
    if (merged.category) params.set("category", merged.category);
    const q = params.toString();
    return q ? `/blog?${q}` : "/blog";
  };

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {total === 0 ? (
            /* Honest empty state — no invented articles. */
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
            <>
              {/* Category filter pills */}
              <div className="mb-10 flex flex-wrap justify-center gap-2">
                <Link
                  href={buildQuery({ page: 1, category: undefined })}
                  className={`tag-chip !text-xs transition ${
                    !categorySlug
                      ? "!bg-[var(--main-color)] !text-white"
                      : "hover:!bg-[rgba(133,52,234,0.15)]"
                  }`}
                >
                  All
                </Link>
                {CATEGORY_ORDER.map((name) => {
                  const slug = slugifyCategory(name);
                  return (
                    <Link
                      key={slug}
                      href={buildQuery({ page: 1, category: slug })}
                      className={`tag-chip !text-xs transition ${
                        categorySlug === slug
                          ? "!bg-[var(--main-color)] !text-white"
                          : "hover:!bg-[rgba(133,52,234,0.15)]"
                      }`}
                    >
                      {name}
                    </Link>
                  );
                })}
              </div>

              {/* Featured article panel */}
              {featured ? (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="picto-card group mb-12 block overflow-hidden p-0"
                >
                  <div className="grid md:grid-cols-2">
                    {urlForImage(featured.image, { width: 900 }) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={urlForImage(featured.image, { width: 900 })}
                        alt={
                          featured.image?.altText ||
                          featured.image?.alt ||
                          featured.title
                        }
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-full"
                      />
                    ) : (
                      <div className="flex h-64 items-center justify-center bg-[linear-gradient(135deg,#f3e9ff_0%,#e7d4ff_100%)] md:h-full">
                        <i
                          className="fa-solid fa-star text-4xl text-[rgba(133,52,234,0.4)]"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="p-8 sm:p-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="pending-chip">Featured</span>
                        {featured.category ? (
                          <span className="tag-chip">{featured.category}</span>
                        ) : null}
                      </div>
                      <h2 className="section-title mt-4 text-2xl group-hover:text-[var(--main-color)]">
                        {featured.title}
                      </h2>
                      {featured.excerpt ? (
                        <p className="text-gray mt-3 text-sm leading-relaxed">
                          {featured.excerpt}
                        </p>
                      ) : null}
                      <div className="text-gray mt-5 flex flex-wrap items-center gap-4 text-xs">
                        <time dateTime={featured.publishedAt}>
                          {formatDate(featured.publishedAt)}
                        </time>
                        {featured.readingTime ? (
                          <span>{featured.readingTime} min read</span>
                        ) : null}
                        <span className="font-semibold text-[var(--main-color)]">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : null}

              {/* Grid of remaining cards */}
              {gridPosts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : null}

              {/* Pagination */}
              {totalPages > 1 ? (
                <nav
                  className="mt-12 flex items-center justify-center gap-3"
                  aria-label="Blog pagination"
                >
                  {page > 1 ? (
                    <Link
                      href={buildQuery({ page: page - 1 })}
                      className="btn-outline text-sm"
                    >
                      ← Previous
                    </Link>
                  ) : null}
                  <span className="text-gray text-sm">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages ? (
                    <Link
                      href={buildQuery({ page: page + 1 })}
                      className="btn-primary text-sm"
                    >
                      Next →
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>

      <WorkTogether />
    </PageShell>
  );
}
