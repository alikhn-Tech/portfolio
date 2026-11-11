
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from "@/components/ui";

interface ProjectCardProps {
  title: string;
  href: string;
  image: string;
  category: string;
  linkLabel?: string;
  downloadHref?: string;
  downloadLabel?: string;
}

export function ProjectCard({
  title,
  href,
  image,
  category,
  linkLabel = "Visit website",
  downloadHref,
  downloadLabel = "Download Performance Report",
}: ProjectCardProps) {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="card-motion group h-full overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-gray-400"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <CardBody className="flex h-full flex-col p-5">
        <Typography
          as="h3"
          variant="h5"
          color="blue-gray"
          className="mb-2 break-words"
        >
          {title}
        </Typography>

        <Typography className="mb-6 text-sm font-normal !text-gray-500">
          {category}
        </Typography>

      <div className="mt-auto flex flex-col items-start gap-3">
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 font-medium text-gray-900 transition-colors hover:text-gray-600"
  >
    {linkLabel}
    <ArrowTopRightOnSquareIcon
      aria-hidden="true"
      className="h-4 w-4"
    />
  </a>

  {downloadHref && (
    <a
      href={downloadHref}
      download
      className="inline-flex items-center gap-2 font-medium text-gray-900 transition-colors hover:text-gray-600"
    >
      {downloadLabel}
      <ArrowTopRightOnSquareIcon
        aria-hidden="true"
        className="h-4 w-4"
      />
    </a>
  )}
</div>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
