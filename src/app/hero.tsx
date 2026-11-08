"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Typography } from "@/components/ui";
import { SITE, asset } from "@/lib/site";

function Monogram() {
  return (
    <div className="grid h-full place-items-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="text-center">
        <span
          aria-hidden="true"
          className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-white text-4xl font-medium text-gray-900 shadow-sm"
        >
          AK
        </span>
        <Typography className="mt-4 font-normal !text-gray-500">
          Portrait to be added
        </Typography>
      </div>
    </div>
  );
}

function Hero({ hasPhoto }: { hasPhoto: boolean }) {
  // `hasPhoto` is resolved at build time, so a missing file never renders a
  // broken image; `failed` covers a file that exists but cannot be decoded.
  const [failed, setFailed] = useState(false);
  const showPhoto = hasPhoto && !failed;

  return (
    <header id="home" className="scroll-mt-24 bg-white p-8">
      <div className="container mx-auto grid h-full min-h-[60vh] w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-3 uppercase tracking-wide"
          >
            {SITE.name}
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-3xl !leading-tight lg:text-5xl"
          >
            {SITE.role}
          </Typography>
          <Typography
            variant="lead"
            className="mb-4 !text-gray-500 md:pr-16 xl:pr-28"
          >
            I&apos;m {SITE.name}, a {SITE.role} and Co-Founder at {SITE.company}.
            My work spans web development, AI automation, and Google Ads, where I
            combine software development and digital technologies to solve real
            business challenges.
          </Typography>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#projects">
              <Button color="gray">View my work</Button>
            </a>
            <a href="#contact">
              <Button variant="outlined" color="gray">
                Get in touch
              </Button>
            </a>
          </div>
        </div>
        <div className="relative h-[28rem] w-full overflow-hidden rounded-xl bg-gray-100 sm:h-[36rem]">
          {showPhoto ? (
            <Image
              src={asset(SITE.photo)}
              alt={`Portrait of ${SITE.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
              onError={() => setFailed(true)}
            />
          ) : (
            <Monogram />
          )}
        </div>
      </div>
    </header>
  );
}

export default Hero;
