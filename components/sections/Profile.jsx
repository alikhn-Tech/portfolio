import Link from "next/link";
import { aboutData } from "@/data/site";

/* Original Picto profile/about section: two-column card with facts list. */
export default function Profile({ compact = false }) {
  return (
    <section id="profile" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="picto-card grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="sub-title">About Me</span>
            <h2 className="section-title mt-3">
              {aboutData.name} —{" "}
              <span className="gradient-text">{aboutData.profession}</span>
            </h2>
            <p className="text-gray mt-5 leading-relaxed">
              {aboutData.description}
            </p>
            {!compact && (
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary text-sm">
                  More About Me
                </Link>
                <Link href="/expertise" className="btn-outline text-sm">
                  My Expertise
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {aboutData.facts.map((f) => (
                <li
                  key={f.label}
                  className="flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--body-color)] px-5 py-4"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--main-color)]">
                    {f.label}
                  </span>
                  <span
                    className={`mt-1 font-medium ${
                      f.value.startsWith("PENDING") ? "text-gray italic" : ""
                    }`}
                  >
                    {f.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
