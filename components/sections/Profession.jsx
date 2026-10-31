import { expertiseAreas } from "@/data/site";

/* Original Picto services/profession cards: icon circle + title + text. */
export default function Profession({ limit }) {
  const items = typeof limit === "number" ? expertiseAreas.slice(0, limit) : expertiseAreas;
  return (
    <section id="service" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="sub-title">Expertise</span>
          <h2 className="section-title mt-3">
            What I <span className="gradient-text">Do Best</span>
          </h2>
          <p className="text-gray mx-auto mt-4 max-w-2xl">
            A blend of AI automation, engineering and marketing skills — used
            together to build solutions that actually move the needle.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <article key={s.id} id={s.id} className="picto-card p-8">
              <div className="icon-circle">
                <i className={`fa-solid ${s.icon}`} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="text-gray mt-2 text-sm leading-relaxed">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
