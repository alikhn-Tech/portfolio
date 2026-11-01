import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/common/PageShell";
import WorkTogether from "@/components/sections/WorkTogether";
import PostCard, { formatDate } from "@/components/blog/PostCard";
import BlogPortableText from "@/components/blog/BlogPortableText";
import { getPostBySlug, getPublishedSlugs, BLOG_REVALIDATE } from "@/lib/sanity/fetch";
import { urlForImage } from "@/lib/sanity/image";
import { absoluteUrl } from "@/data/site";

export const revalidate = 60;

// Pre-render currently published slugs at build time; new posts are added
// on demand via ISR (blocking:false) — no redeploy needed.
export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return (slugs || []).filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false } };

  const seo = post.seo || {};
  const title = seo.title || post.title;
  const description = seo.description || post.excerpt || "";
  const image =
    urlForImage(seo.ogImage || post.image, { width: 1200 }) || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: seo.canonical || absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt,
      images: image ? [{ url: image, alt: post.image?.altText || title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound(); // invalid/unpublished slugs -> real 404

  const heroImg = urlForImage(post.image, { width: 1200 });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author?.name || "Ali Khan" },
    image: heroImg || undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <PageShell heroShape>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <header className="pt-16 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb">
              <Link
                href="/blog"
                className="text-gray inline-flex items-center gap-2 text-sm hover:text-[var(--main-color)]"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Blog
              </Link>
            </nav>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {post.category ? (
                <span className="tag-chip">{post.category.name}</span>
              ) : null}
              {post.featured ? <span className="pending-chip">Featured</span> : null}
            </div>
            <h1 className="hero-title mt-4 text-[clamp(1.75rem,4.5vw,3rem)]">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="text-gray mx-auto mt-4 max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}
            <div className="text-gray mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
              <span>
                <i className="fa-regular fa-user mr-1.5" aria-hidden="true" />
                {post.author?.name || "Ali Khan"}
              </span>
              <time dateTime={post.publishedAt}>
                <i className="fa-regular fa-calendar mr-1.5" aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </time>
              {post.readingTime ? (
                <span>
                  <i className="fa-regular fa-clock mr-1.5" aria-hidden="true" />
                  {post.readingTime} min read
                </span>
              ) : null}
            </div>
          </div>
        </header>

        {/* Featured image */}
        {heroImg ? (
          <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImg}
              alt={post.image?.altText || post.image?.alt || post.title}
              className="w-full rounded-[2rem] shadow-[0_25px_60px_-25px_var(--shadow-color)]"
            />
          </div>
        ) : null}

        {/* Body */}
        <div className="section-padding">
          <BlogPortableText value={post.body} />

          {/* Tags */}
          {post.tags?.length ? (
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2 px-4">
              {post.tags.map((tag) => (
                <span key={tag._id || tag.name} className="tag-chip">
                  #{tag.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Related articles */}
        {post.relatedPosts?.length ? (
          <section className="pb-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="section-title text-center text-2xl">
                Related <span className="gradient-text">Articles</span>
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts.map((rp) => (
                  <PostCard key={rp._id} post={rp} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <WorkTogether />
    </PageShell>
  );
}
