import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Navbar } from "@/components";
import { PostBody } from "@/components/post-body";
import { Typography } from "@/components/ui";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";
import { imageUrlFor } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Re-fetch from Sanity at most once a minute (ISR). */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const cover = imageUrlFor(post.coverImage, { width: 1200, height: 630 });

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt,
      ...(cover
        ? { images: [{ url: cover, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const cover = imageUrlFor(post.coverImage, { width: 1600, height: 900 });

  return (
    <>
      <Navbar />
      <main id="main">
        <article className="px-8 pb-24 pt-16">
          <div className="container mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              &larr; Back to blog
            </Link>

            <Typography
              variant="h1"
              color="blue-gray"
              className="mt-6 text-4xl !leading-tight lg:text-5xl"
            >
              {post.title}
            </Typography>

            <time
              dateTime={post.publishedAt}
              className="mt-4 block text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              {formatPostDate(post.publishedAt)}
            </time>

            {cover ? (
              <Image
                src={cover}
                alt={post.coverImage?.alt ?? ""}
                width={1600}
                height={900}
                priority
                className="mt-10 h-auto w-full rounded-xl"
              />
            ) : null}

            <div className="prose prose-gray mt-10 max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
              <PostBody value={post.body} />
            </div>

            <div className="mt-16 border-t border-gray-200 pt-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-900 underline underline-offset-4"
              >
                Read more posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
