import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/common/PageShell";
import WorkTogether from "@/components/sections/WorkTogether";
import PostCard from "@/components/blog/PostCard";
import { getActiveCategories, getBlogPage } from "@/lib/sanity/fetch";
import { absoluteUrl } from "@/data/site";

// Same ISR window as the main blog listing — new publishes refresh via
// webhook revalidation, with this timer as the safety net.
export const revalidate = 60;

/** Slugs of categories that currently have at least one published post. */
export async function generateStaticParams() {
  const categories = await getActiveCategories();
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getActiveCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Category Not Found", robots: { index: false } };
  }
  return {
    title: `${category.name} — Blog`,
    description: `Articles about ${category.name} by Ali Khan: hands-on writing on AI agents, automation and growth.`,
    alternates: { canonical: absoluteUrl(`/blog/category/${slug}`) },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;

  // Only categories with published posts are resolvable here; unknown or
  // empty slugs fall through to the shared empty state below.
  const [categories, { posts, total, page, totalPages }] = await Promise.all([
    getActiveCategories(),
    getBlogPage({ page: 1, category: slug }),
  ]);

  const category = categories.find((c) => c.slug === slug);

  // Slug is not a real category at all -> genuine 404. (A real category
  // whose posts were unpublished keeps total === 0 and shows the empty
  // state instead.)
  if (!category && total > 0) notFound();

  return (
    <PageShell heroShape>
      <section className="pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="sub-title">Blog Category</span>
          <h1 className="hero-title mt-3 text-[clamp(2rem,5vw,3.25rem)]">
            {category ? (
              <>
                {category.name} <span className="gradient-text">Articles</span>
              </>
            ) : (
              <>
                Category <span className="gradient-text">Articles</span>
              </>
            )}
          </h1>
        </div>
      </section>

      <section id="blogs" className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {total === 0 ? (
            /* Professional empty state for categories without published posts. */
            <div className="picto-card p-10 text-center sm:p-14">
              <i
                className="fa-regular fa-folder-open text-5xl text-[rgba(133,52,234,0.35)]"
                aria-hidden="true"
              />
              <h2 className="section-title mt-6 text-2xl">No articles yet</h2>
              <p className="text-gray mx-auto mt-3 max-w-xl text-sm leading-relaxed">
                We&apos;re working on something useful. There are no articles
                in this category yet. Explore our latest insights in the
                meantime.
              </p>
              <Link href="/blog" className="btn-primary mt-8 inline-block">
                Explore All Articles
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
                <span className="tag-chip !bg-[var(--main-color)] !text-white !text-xs">
                  {category?.name || slug}
                </span>
                <Link
                  href="/blog"
                  className="tag-chip !text-xs transition hover:!bg-[rgba(133,52,234,0.15)]"
                >
                  ← All Articles
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  className="mt-12 flex items-center justify-center gap-3"
                  aria-label="Category pagination"
                >
                  {page > 1 ? (
                    <Link
                      href={`/blog/category/${slug}?page=${page - 1}`}
                      className="btn-outline text-sm"
                    >
                      ← Previous
                    </Link>
                  ) : null}
                  <span className="text-gray text-sm">
                    Page {page} of {totalPages} · {total} article
                    {total === 1 ? "" : "s"}
                  </span>
                  {page < totalPages ? (
                    <Link
                      href={`/blog/category/${slug}?page=${page + 1}`}
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
