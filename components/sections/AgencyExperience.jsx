import { siteConfig } from "@/data/site";

/* Webistic Marketing Solutions — co-founder experience card.
   Reuses the original Picto picto-card / sub-title / tag-chip language.
   Logo + agency name link to the official website (new tab). */
export default function AgencyExperience() {
  const a = siteConfig.agency;
  if (!a) return null;

  return (
    <section id="agency" className="section-padding pt-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <article className="picto-card p-8 sm:p-10">
          <span className="sub-title">Professional Experience</span>

          <div className="mt-5 flex items-center gap-5">
            {/* Official Webistic logo — clickable, opens in a new tab */}
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${a.name} website (opens in a new tab)`}
              className="group shrink-0 rounded-2xl border border-[var(--border-color)] bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--main-color)] hover:shadow-[0_20px_40px_-24px_var(--shadow-color)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.logo}
                alt={`${a.name} logo`}
                width={72}
                height={72}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16"
              />
            </a>

            <div>
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[var(--main-color)]"
                >
                  {a.name}
                  <span className="sr-only">
                    {" "}
                    (opens in a new tab)
                  </span>
                </a>
              </h2>
              <p className="text-gray mt-1 text-sm font-medium">
                {a.role} · {a.region}
              </p>
            </div>
          </div>

          <p className="text-gray mt-5 text-sm leading-relaxed sm:text-base">
            {a.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="tag-chip !text-sm">{a.role}</span>
            <span className="tag-chip !text-sm">Digital Marketing</span>
            <span className="tag-chip !text-sm">Growth</span>
            <span className="tag-chip !text-sm">Web Development</span>
            <span className="tag-chip !text-sm">Automation</span>
          </div>

          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-7 text-sm"
          >
            Visit webistic.co
            <i
              className="fa-solid fa-arrow-up-right-from-square text-xs"
              aria-hidden="true"
            />
          </a>
        </article>
      </div>
    </section>
  );
}
