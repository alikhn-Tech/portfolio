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
          {/* Thumbnail area */}
          <div className="relative flex aspect-[16/10] items-center justify-center bg-[rgba(133,52,234,0.07)]">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={`${p.title} — project preview`}
                className="absolute inset-0 h-full w-full object-cover"
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
