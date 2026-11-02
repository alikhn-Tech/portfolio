import { toolLogos } from "@/data/site";
import { BRAND_LOGOS } from "./brandLogos";

/* Tools & Technologies — clickable official brand-logo grid.
   Marks are verbatim simple-icons (CC0) SVGs inlined with currentColor, so
   each logo shifts from neutral grey to its official brand colour on hover.
   Cards reuse the original Picto picto-card styling and transitions. */

// Official brand colours (simple-icons brand palette).
const BRAND_COLORS = {
  "Next.js": "#181717", // near-black mark disc; logo itself renders white
  React: "#61DAFB",
  "Tailwind CSS": "#38BDF8",
  Sanity: "#F0365B",
  n8n: "#EA4B71",
  OpenAI: "#181717",
  Claude: "#D97757",
  "Google Ads": "#CECEF6",
  "Meta Ads": "#0866FF",
  GitHub: "#181717",
  Vercel: "#181717",
};

// White marks sit on a dark disc so they stay visible on white cards.
const DARK_CHIP = new Set(["Next.js", "OpenAI", "Vercel"]);

export default function ToolsLogos() {
  return (
    <section id="tools" className="section-padding pt-0">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="sub-title">Toolbox</span>
          <h2 className="section-title mt-3">
            Tools &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-gray mx-auto mt-4 max-w-2xl text-sm">
            The platforms behind my work — click any logo to visit its official
            website.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {toolLogos.map((t) => {
            const brand = BRAND_COLORS[t.name] ?? "var(--main-color)";
            const dark = DARK_CHIP.has(t.name);
            return (
              <li key={t.name}>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.name} — official website (opens in a new tab)`}
                  className="group picto-card flex flex-col items-center justify-center gap-3 p-5 sm:p-6"
                  style={{ "--brand": brand }}
                >
                  {/* Logo disc: neutral grey by default, brand colour on hover */}
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-[var(--brand)] ${
                      dark
                        ? "bg-[#181717] text-white"
                        : "bg-[rgba(133,52,234,0.08)] text-[var(--text-gray)] group-hover:text-white"
                    }`}
                  >
                    <span
                      className="[&>svg]:h-7 [&>svg]:w-7 sm:[&>svg]:h-8 sm:[&>svg]:w-8"
                      dangerouslySetInnerHTML={{ __html: BRAND_LOGOS[t.name] }}
                    />
                  </span>
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
