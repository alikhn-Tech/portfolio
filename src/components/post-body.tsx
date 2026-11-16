import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { imageUrlFor, type SanityImage } from "@/lib/sanity";

const components = {
  block: {
    // The article template owns the page H1; CMS H1 blocks are section headings.
    h1: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
  },
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      const url = imageUrlFor(value, { width: 1600, height: 900 });
      if (!url) {
        return null;
      }

      return (
        <figure className="my-10">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1600}
            height={900}
            sizes="(min-width: 832px) 768px, 85vw"
            className="h-auto w-full rounded-xl"
          />
          {value.caption ? (
            <figcaption className="mt-3 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          className="font-medium text-gray-900 underline underline-offset-2"
          {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-900">
        {children}
      </code>
    ),
  },
};

function normalizeHeadingText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.!?…]+$/, "")
    .toLowerCase();
}

function withoutLeadingDuplicateTitle(
  value: PortableTextBlock[],
  title: string,
) {
  const firstBlock = value[0];
  if (
    !firstBlock ||
    firstBlock._type !== "block" ||
    !/^h[1-6]$/.test(firstBlock.style ?? "")
  ) {
    return value;
  }

  const headingText = firstBlock.children
    .map((child) =>
      "text" in child && typeof child.text === "string" ? child.text : "",
    )
    .join("");

  return normalizeHeadingText(headingText) === normalizeHeadingText(title)
    ? value.slice(1)
    : value;
}

export function PostBody({
  value,
  title,
}: {
  value: PortableTextBlock[];
  title: string;
}) {
  return (
    <PortableText
      value={withoutLeadingDuplicateTitle(value, title)}
      components={components}
    />
  );
}
