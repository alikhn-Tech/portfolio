"use client";

import { Typography } from "@/components/ui";

export default function Background() {
  return (
    <section id="background" className="scroll-mt-24 px-8 py-24">
      <div className="container mx-auto max-w-4xl text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          About
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-6">
          My Background
        </Typography>
        <Typography variant="lead" className="!text-gray-500">
          I&apos;m a Junior Software Engineer and Co-Founder at Webistic
          Marketing Solutions. My work brings together website development, AI
          automation, and digital advertising, with a focus on practical
          solutions for real business needs.
        </Typography>
      </div>
    </section>
  );
}
