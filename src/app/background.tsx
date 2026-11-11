
"use client";

import { Typography } from "@/components/ui";

export default function Background() {
  return (
    <section
      data-reveal
      id="background"
      className="scroll-mt-24 bg-white px-8 py-24"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl md:p-14">
          <Typography
            color="blue-gray"
            className="mb-3 font-bold uppercase tracking-widest !text-black"
          >
            About
          </Typography>

          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-8 !text-black"
          >
            My Background
          </Typography>

          <Typography
            variant="lead"
            className="mx-auto max-w-3xl !text-black"
          >
            I&apos;m a Junior Software Engineer and Co-Founder at Webistic
            Marketing Solutions. My work brings together website development,
            AI automation, and digital advertising, with a focus on practical
            solutions for real business needs.
          </Typography>

          <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-black transition-all duration-500 group-hover:w-28" />
        </div>
      </div>
    </section>
  );
}
