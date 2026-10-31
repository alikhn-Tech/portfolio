import Link from "next/link";

/* Original Picto "let's work together" CTA band: gradient panel inside a card. */
export default function WorkTogether() {
  return (
    <section id="work-together" className="section-padding pt-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white sm:px-16"
          style={{
            background:
              "linear-gradient(135deg, #8534ea 0%, #b06bff 55%, #3d1a6e 100%)",
          }}
        >
          <div
            className="dots-shape absolute -right-6 -top-6 h-32 w-32 [background-image:radial-gradient(white_1px,transparent_1px)]"
            aria-hidden="true"
          />
          <span className="sub-title !text-white/80">Work Together</span>
          <h2 className="section-title mt-3 !text-white">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85">
            From AI agents and automations to websites and ad campaigns — tell
            me what you need and I&apos;ll design the solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#8534ea]"
            >
              Start a Conversation
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link
              href="/expertise"
              className="btn-primary !border-white !bg-white !text-[#8534ea] hover:!bg-transparent hover:!text-white"
            >
              Explore Expertise
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
