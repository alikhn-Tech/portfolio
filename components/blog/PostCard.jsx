import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

export function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/** Blog card in the original Picto card language (rounded, purple-shadowed). */
export default function PostCard({ post }) {
  const img = urlForImage(post.image, { width: 640 });
  return (
    <article className="picto-card flex h-full flex-col overflow-hidden p-0">
      {img ? (
        <Link href={`/blog/${post.slug}`} aria-label={post.title}>
          {/* plain <img> — same approach as the rest of the Picto site */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={post.image?.altText || post.image?.alt || post.title}
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </Link>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-[linear-gradient(135deg,#f3e9ff_0%,#e7d4ff_100%)]">
          <i
            className="fa-regular fa-pen-to-square text-3xl text-[rgba(133,52,234,0.4)]"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2">
          {post.category ? <span className="tag-chip">{post.category}</span> : null}
          {post.readingTime ? (
            <span className="text-gray text-xs">
              <i className="fa-regular fa-clock mr-1" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-[var(--main-color)]">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <p className="text-gray mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-5 flex items-center justify-between">
          <time className="text-gray text-xs" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-[var(--main-color)] hover:underline"
          >
            Read More{" "}
            <i className="fa-solid fa-arrow-right ml-1 text-xs" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
