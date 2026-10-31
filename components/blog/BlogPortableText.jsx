import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";

/* Render Sanity inline images (annotation type "image") as Picto-friendly figures. */
const components = {
  types: {
    image: ({ value }) => {
      const src = urlForImage(value, { width: 900 });
      if (!src) return null;
      const alt = value?.alt || value?.altText || "";
      return (
        <figure className="my-10">
          {/* plain <img> keeps the original template's image approach */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="mx-auto w-full rounded-3xl shadow-[0_20px_50px_-20px_var(--shadow-color)]"
          />
          {value?.caption ? (
            <figcaption className="text-gray mt-3 text-center text-xs">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-8 overflow-x-auto rounded-2xl bg-[#1c1c1c] p-6 text-sm leading-relaxed text-white">
        <code>{value?.code || ""}</code>
      </pre>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
          className="font-medium text-[var(--main-color)] underline decoration-[rgba(133,52,234,0.35)] underline-offset-4 hover:decoration-[var(--main-color)]"
        >
          {children}
        </a>
      );
    },
  },
  blockTypes: {
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[var(--main-color)] pl-6 text-lg italic text-heading">
        {children}
      </blockquote>
    ),
  },
};

/**
 * Portable Text renderer styled to match the Picto typography.
 * `value` is the raw Portable Text array from Sanity.
 */
export default function BlogPortableText({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="blog-prose mx-auto max-w-3xl">
      <PortableText value={value} components={components} />
    </div>
  );
}
