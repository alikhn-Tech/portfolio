"use client";

import { Typography } from "@/components/ui";
import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { SkillCard } from "@/components";

const STEPS = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Understand",
    children:
      "Start by understanding the business need, users, and goals for the work.",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Plan",
    children:
      "Outline a practical approach and identify the tools and requirements involved.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Build",
    children:
      "Develop and implement the website, automation, or advertising work.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Review",
    children:
      "Test the implementation, review it against the requirements, and make improvements.",
  },
];

export default function Workflow() {
  return (
    <section id="how-i-work" className="scroll-mt-24 px-8 py-20">
      <div className="container mx-auto mb-16 text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          Approach
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          How I Work
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:w-8/12"
        >
          A straightforward process, shaped around the requirements of each
          project.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <SkillCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  );
}
