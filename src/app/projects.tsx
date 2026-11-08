"use client";

import { ProjectCard } from "@/components";
import { Typography } from "@/components/ui";

const PROJECTS = [
  {
    title: "7daysready.co.uk",
    href: "https://7daysready.co.uk/",
  },
  {
    title: "webistic.co",
    href: "https://webistic.co/",
  },
  {
    title: "parkstoneminibuses.com",
    href: "https://parkstoneminibuses.com/",
  },
  {
    title: "onyxgentlemansaloon.com",
    href: "https://onyxgentlemansaloon.com/",
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-8 py-28">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Selected Website Projects
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
        >
          A selection of websites I have worked on. Visit each site to see it
          live.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
