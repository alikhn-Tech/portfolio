import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from "@/components/ui";

interface ProjectCardProps {
  title: string;
  href: string;
}

export function ProjectCard({ title, href }: ProjectCardProps) {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-full border-t border-gray-200 pt-6"
    >
      <CardBody className="flex h-full flex-col p-0">
        <Typography
          as="h3"
          variant="h5"
          color="blue-gray"
          className="mb-3 break-words"
        >
          {title}
        </Typography>
        <Typography className="mb-6 font-normal !text-gray-500">
          Website project
        </Typography>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-2 font-medium text-gray-900 transition-colors hover:text-gray-600"
        >
          Visit website
          <ArrowTopRightOnSquareIcon aria-hidden="true" className="h-4 w-4" />
        </a>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
