
import { ProjectCard } from "@/components";
import { Typography } from "@/components/ui";

const PROJECTS = [
  {
    title: "7DaysReady",
    href: "https://7daysready.co.uk/",
    image: "/7daysready-website.jpeg",
    imageAlt: "7 Days Ready driving lessons website homepage.",
    category: "Website Development",
  },
  {
    title: "Webistic Marketing Solutions",
    href: "https://webistic.co/",
    image: "/webistic-website.jpeg",
    imageAlt: "Webistic Marketing Solutions website homepage.",
    category: "Website Development",
  },
  {
    title: "Parkstone Minibuses",
    href: "https://parkstoneminibuses.com/",
    image: "/parkstone-minibuses.jpeg",
    imageAlt: "Parkstone Minibuses website homepage.",
    category: "Website Development",
  },
  {
    title: "Onyx Gentleman Salon",
    href: "https://onyxgentlemansaloon.com/",
    image: "/onyx-gentlemansalon.jpeg",
    imageAlt: "Onyx Gentleman Salon website homepage.",
    category: "Website Development",
  },
  {
    title: "7DaysReady — Google Ads Campaign",
    href: "https://7daysready.co.uk/",
    image: "/7daysready-google-ads.jpeg",
    imageAlt: "Google Ads campaign overview for 7DaysReady.",
    category: "Google Ads & Performance Marketing",
    linkLabel: "Visit client website",
    downloadHref: "/7%20Days%20Ready%20-%20Google%20Ads%20Performance%20Report.pdf",
    downloadLabel: "Download Performance Report",
  },
  {
    title: "Webistic Image Compressor",
    href: "https://webisticimagecompressor.online/",
    image: "/webisticimagecompressor.jpeg",
    imageAlt: "Webistic Image Compressor web application.",
    category: "Web Application Development",
  },
];

export function Projects() {
  return (
    <section data-reveal id="projects" className="scroll-mt-24 px-8 py-28">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Selected Projects
        </Typography>

        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
        >
          A selection of my work across website development, web applications,
          and Google Ads.
        </Typography>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
