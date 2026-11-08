"use client";

import { Typography, buttonClassName } from "@/components/ui";
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import { ResumeItem } from "@/components";
import { SITE, asset } from "@/lib/site";

const RESUME_ITEMS = [
  {
    icon: BriefcaseIcon,
    children: "Junior Software Engineer",
  },
  {
    icon: BriefcaseIcon,
    children: "Co-Founder at Webistic Marketing Solutions",
  },
  {
    icon: CodeBracketIcon,
    children:
      "Website projects include 7daysready.co.uk, webistic.co, parkstoneminibuses.com, and onyxgentlemansaloon.com",
  },
  {
    icon: CpuChipIcon,
    children:
      "Work across web development, AI calling and WhatsApp agents, workflow automation, and Google Ads",
  },
];

export function Resume({ hasResume }: { hasResume: boolean }) {
  return (
    <section id="resume" className="scroll-mt-24 px-8 py-24">
      <div className="container mx-auto grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="col-span-1">
          <Typography variant="h2" color="blue-gray">
            Professional Background
          </Typography>
          <Typography className="mb-4 mt-3 max-w-xl font-normal !text-gray-500">
            I&apos;m a Junior Software Engineer and Co-Founder at Webistic
            Marketing Solutions. My experience includes website projects and
            work in AI automation and Google Ads.
          </Typography>
          {hasResume && (
            <a
              href={asset(SITE.resume)}
              download={SITE.resumeFilename}
              className={buttonClassName({ className: "mt-6" })}
            >
              <ArrowDownTrayIcon aria-hidden="true" className="h-4 w-4" />
              Download Resume
            </a>
          )}
        </div>
        <div className="col-span-1 grid gap-y-6 lg:ml-auto lg:pr-12 xl:pr-20">
          {RESUME_ITEMS.map((props) => (
            <ResumeItem key={props.children} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resume;
