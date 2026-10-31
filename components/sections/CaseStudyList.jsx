import { projects } from "@/data/site";

/* Case-study list rendered in the original Picto card language. Each entry
   has id={slug} so `/projects` and `/case-studies` anchors always resolve —
   no 404s. Verified facts only; unverified fields show "details pending". */
export default function CaseStudyList() {
  return (
    <div className="space-y-6">
      {projects.map((p) => (
        <article key={p.slug} id={p.slug} className="picto-card p-8 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="tag-chip">{p.category}</span>
              <h3 className="section-title mt-3 text-2xl">{p.title}</h3>
            </div>
            <span
              className={`pending-chip ${
                p.status === "delivered" ? "" : ""
              }`}
            >
              {p.status === "delivered"
                ? "Delivered · Full case study pending"
                : "In progress"}
            </span>
          </div>

          <p className="text-gray mt-4 leading-relaxed">{p.summary}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                Client
              </dt>
              <dd className="text-gray mt-1 text-sm">
                {p.client ?? "Details pending"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                Live URL
              </dt>
              <dd className="text-gray mt-1 text-sm">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--main-color)] hover:underline"
                  >
                    {p.url}
                  </a>
                ) : (
                  "Pending verification"
                )}
              </dd>
            </div>
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
          </dl>

          <ul className="text-gray mt-6 list-disc space-y-1 pl-5 text-sm">
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
