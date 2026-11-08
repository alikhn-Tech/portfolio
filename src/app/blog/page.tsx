import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Navbar } from "@/components";
import { Typography } from "@/components/ui";
import { formatPostDate, getPosts } from "@/lib/blog";
import { imageUrlFor } from "@/lib/sanity";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes on web development, AI automation and digital marketing from ${SITE.name}.`,
  alternates: { canonical: "/blog" },
};

/** Re-fetch from Sanity at most once a minute (ISR). */
export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main id="main">
        <section className="scroll-mt-24 px-8 pb-24 pt-16">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <Typography
                color="blue-gray"
                className="mb-2 font-bold uppercase"
              >
                Writing
              </Typography>
              <Typography
                variant="h1"
                color="blue-gray"
                className="mb-4 text-4xl lg:text-5xl"
              >
                Blog
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto w-full !text-gray-500 lg:w-8/12"
              >
                Notes on web development, AI automation and digital marketing.
              </Typography>
            </div>

            {posts.length === 0 ? (
              <div className="rounded-xl border border-gray-200 px-8 py-16 text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  No posts yet
                </Typography>
                <Typography className="font-normal !text-gray-500">
                  Posts published in Sanity will appear here.
                </Typography>
              </div>
            ) : (
              <ul className="flex flex-col gap-12">
                {posts.map((post) => {
                  const cover = imageUrlFor(post.coverImage, {
                    width: 600,
                    height: 400,
                  });

                  return (
                    <li key={post._id} className="border-t border-gray-200 pt-8">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group grid gap-6 sm:grid-cols-[1fr_200px] sm:items-start"
                      >
                        <div>
                          <time
                            dateTime={post.publishedAt}
                            className="text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            {formatPostDate(post.publishedAt)}
                          </time>
                          <Typography
                            variant="h3"
                            color="blue-gray"
                            className="mt-2 transition-colors group-hover:text-gray-600"
                          >
                            {post.title}
                          </Typography>
                          {post.excerpt ? (
                            <Typography className="mt-3 font-normal !text-gray-500">
                              {post.excerpt}
                            </Typography>
                          ) : null}
                          <span className="mt-4 inline-block text-sm font-medium text-gray-900 underline-offset-4 group-hover:underline">
                            Read post
                          </span>
                        </div>
                        {cover ? (
                          <Image
                            src={cover}
                            alt={post.coverImage?.alt ?? ""}
                            width={600}
                            height={400}
                            className="h-40 w-full rounded-lg object-cover sm:h-[120px]"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
