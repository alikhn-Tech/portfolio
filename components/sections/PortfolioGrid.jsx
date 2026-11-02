import Link from "next/link";
import { projects } from "@/data/site";

/* Original Picto portfolio card: image area, category chip, title, tags.
   Missing images/clients are rendered as clearly-labelled pending
   placeholders — never fabricated content. */
export default function PortfolioGrid({ items = projects, linkTo = "/case-studies" }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <article key={p.slug} id={p.slug} className="picto-card overflow-hidden">
          {/* Thumbnail area — screenshots are portrait website captures, so
              the frame is 4:5 and images use object-contain on a light card
              background to avoid cropping site content. */}
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={`${p.title} — project preview`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[var(--main-color)]">
                <i
                  className="fa-regular fa-image text-4xl opacity-50"
                  aria-hidden="true"
                />
                <span className="pending-chip">Screenshot pending</span>
              </div>
            )}
            <span className="tag-chip absolute left-4 top-4 bg-white/90">
              {p.category}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
            <p className="text-gray mt-2 text-sm leading-relaxed">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                href={`${linkTo}#${p.slug}`}
                scroll={false}
                className="btn-outline text-sm"
                aria-label={`View details for ${p.title}`}
              >
                View Details
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray inline-flex items-center gap-2 text-sm font-medium hover:text-[var(--main-color)]"
                  aria-label={`Visit the live ${p.title} website`}
                >
                  Visit Site
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-xs"
                    aria-hidden="true"
                  />
                </a>
              )}
              {p.status === "in-progress" && (
                <span className="pending-chip">In progress</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
