"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { testimonials, projects, happyClientsLogos } from "@/data/site";

/* Testimonials — original Picto swiper. Renders ONLY if authentic
   testimonials exist; never shows invented content. */
export default function Testimonial() {
  if (testimonials.length === 0) return null;
  /* istanbul ignore next — unreachable until real data is supplied */
  return (
    <section id="testimonials" className="section-padding">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Swiper pagination={{ clickable: true }} autoplay={{ delay: 5000 }}>
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="picto-card p-10 text-center">
                <p className="text-gray leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <h3 className="mt-4 font-bold">{t.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* Happy clients marquee — original Picto infinite logo strip. Hidden until
   verified client logos/names are supplied. */
export function HappyClients() {
  const [mounted, setMounted] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => setMounted(true), []);

  if (!mounted || happyClientItems.length === 0) return null;

  return (
    <section id="clients" className="py-10">
      <div className="marquee-wrapper mx-auto max-w-7xl overflow-hidden px-4 sm:px-6">
        <div className="animate-marquee flex w-max gap-16">
          {[...happyClientItems, ...happyClientItems].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-xl font-bold text-[rgba(28,28,28,0.35)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Populated only when verified client names/logos are provided in data/site.js
const happyClientItems = happyClientsLogos;

/* Blog preview — original Picto card style. Real published Sanity posts are
   fetched on the server (app/page.jsx) and passed down; empty state is honest. */
export function BlogPreview({ posts = [] }) {
  return (
    <section id="blogs" className="section-padding pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="sub-title">Blog</span>
            <h2 className="section-title mt-3">
              Insights On <span className="gradient-text">AI &amp; Automation</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline text-sm">
            View All Posts
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="picto-card mt-10 p-10 text-center">
            <p className="text-gray">
              Articles are on the way — I&apos;m preparing my first posts on AI
              agents, n8n automations and performance marketing. No filler
              content here, so nothing is published until it&apos;s written.
            </p>
            <span className="pending-chip mt-4 inline-block">
              Content pending
            </span>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post._id || post.slug} className="picto-card p-8">
                <span className="tag-chip">{post.category}</span>
                <h3 className="mt-3 text-lg font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[var(--main-color)]">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray mt-2 text-sm">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Re-export projects for pages that filter them.
export { projects };
