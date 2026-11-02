/* Case-study list rendered in the original Picto card language. Shows only
   projects that do NOT already have a dedicated featured case study on this
   page (the Google Ads entry is featured above — never duplicated). Each
   entry has id={slug} so `/projects` and `/case-studies` anchors always
   resolve — no 404s. Verified facts only; unverified fields are omitted
   rather than shown as public placeholders. */
import { projects } from "@/data/site";

const FEATURED_SLUGS = ["google-ads-driving-school"];

export default function CaseStudyList() {
  const items = projects.filter((p) => !FEATURED_SLUGS.includes(p.slug));
  return (
    <div className="space-y-6">
      {items.map((p) => (
        <article key={p.slug} id={p.slug} className="picto-card p-8 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="tag-chip">{p.category}</span>
              <h3 className="section-title mt-3 text-2xl">{p.title}</h3>
            </div>
            <span className="pending-chip">
              {p.status === "delivered" ? "Delivered" : "In progress"}
            </span>
          </div>

          <p className="text-gray mt-4 leading-relaxed">{p.summary}</p>

          {/* Project screenshot / campaign evidence, when supplied */}
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.image}
              alt={`${p.title} — ${
                p.category === "Performance Marketing"
                  ? "Google Ads campaign results screenshot (first month)"
                  : "project screenshot"
              }`}
              loading="lazy"
              className="mt-6 aspect-[4/5] w-full rounded-xl border border-[var(--border-color)] bg-white object-contain"
            />
          )}

          {/* Only real values are rendered — missing client/URL rows are
              hidden entirely instead of showing placeholder text. */}
          {(p.client || p.url || p.tags?.length) && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {p.client && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                    Client
                  </dt>
                  <dd className="text-gray mt-1 text-sm">{p.client}</dd>
                </div>
              )}
              {p.url && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                    Live URL
                  </dt>
                  <dd className="text-gray mt-1 text-sm">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--main-color)] hover:underline"
                    >
                      {p.url}
                    </a>
                  </dd>
                </div>
              )}
              {p.tags?.length > 0 && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                    Tools
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="tag-chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {p.details?.length > 0 && (
            <ul className="text-gray mt-6 list-disc space-y-1 pl-5 text-sm">
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
