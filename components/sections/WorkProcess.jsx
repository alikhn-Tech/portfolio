import { workProcess } from "@/data/site";

/* Original Picto work-process section: numbered icon cards in a grid. */
export default function WorkProcess() {
  return (
    <section id="work-process" className="section-padding pt-0 lg:pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="sub-title">Work Process</span>
          <h2 className="section-title mt-3">
            How I Deliver <span className="gradient-text">Digital Solutions</span>
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((p) => (
            <li key={p.step} className="picto-card relative p-8">
              <span
                className="absolute right-6 top-4 text-4xl font-extrabold text-[rgba(133,52,234,0.12)]"
                aria-hidden="true"
              >
                {p.step}
              </span>
              <div className="icon-circle">
                <i className={`fa-solid ${p.icon}`} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
              <p className="text-gray mt-2 text-sm leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
