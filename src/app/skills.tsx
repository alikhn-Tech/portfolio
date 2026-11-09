import { Typography } from "@/components/ui";
import { SkillCard } from "@/components";
import { TechnologyBadgeEffect } from "@/components/technology-badge-effect";
import {
  ClaudeLogo,
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  JavaScriptLogo,
  N8nLogo,
  NextjsLogo,
  OpenAiLogo,
  ReactLogo,
  TailwindLogo,
  WhatsAppLogo,
} from "@/components/technology-logos";

/** Service cards use the official brand marks rather than generic icons. */
const SKILLS = [
  {
    icon: NextjsLogo,
    title: "Web Development",
    children:
      "Developing and improving websites and front-end experiences for business needs.",
  },
  {
    icon: N8nLogo,
    title: "AI Automation",
    children:
      "Working with AI calling agents, WhatsApp agents, and workflow automation.",
  },
  {
    icon: GoogleAdsLogo,
    title: "Google Ads",
    children:
      "Managing digital advertising work, including Google Ads for a driving school in Birmingham, UK.",
  },
];

/**
 * Logo comes from `technology-logos.tsx` (inlined SVG, no extra requests).
 * Names are unchanged from the original list.
 */
const TECHNOLOGIES = [
  { name: "Next.js", Logo: NextjsLogo },
  { name: "React", Logo: ReactLogo },
  { name: "JavaScript", Logo: JavaScriptLogo },
  { name: "Tailwind CSS", Logo: TailwindLogo },
  { name: "n8n", Logo: N8nLogo },
  { name: "OpenAI", Logo: OpenAiLogo },
  { name: "Claude", Logo: ClaudeLogo },
  { name: "WhatsApp automation", Logo: WhatsAppLogo },
  { name: "Google Ads", Logo: GoogleAdsLogo },
  { name: "Google Analytics 4", Logo: GoogleAnalyticsLogo },
];

export function Skills() {
  return (
    <section data-reveal id="expertise" className="scroll-mt-24 px-8 py-16">
      <div className="container mx-auto mb-20 text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Areas of work
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          What I do
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:w-8/12"
        >
          My work combines software development and digital tools across these
          areas.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-3">
        {SKILLS.map((props, idx) => (
          <SkillCard key={idx} variant="service" {...props} />
        ))}
      </div>
      <div id="technology" className="container mx-auto scroll-mt-24 pt-20">
        <div className="mb-8 text-center">
          <Typography variant="h3" color="blue-gray" className="mb-3">
            Technology Stack
          </Typography>
          <Typography className="mx-auto max-w-2xl font-normal !text-gray-500">
            Technologies and tools I work with.
          </Typography>
        </div>
        <ul
          id="technology-badges"
          className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
        >
          {TECHNOLOGIES.map(({ name, Logo }) => (
            <li
              key={name}
              data-tech-badge
              className="tech-badge inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800"
            >
              <Logo className="h-[18px] w-[18px] shrink-0" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
        <TechnologyBadgeEffect containerId="technology-badges" />
      </div>
    </section>
  );
}

export default Skills;
