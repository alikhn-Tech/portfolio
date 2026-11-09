import { Card, CardBody, Typography } from "@/components/ui";

interface SkillCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  /**
   * `service` renders a bordered card with a brand logo (What I do).
   * `process` renders the plain card with a dark icon disc (How I Work).
   */
  variant?: "process" | "service";
}

export function SkillCard({
  icon: Icon,
  title,
  children,
  variant = "process",
}: SkillCardProps) {
  const isService = variant === "service";

  return (
    <Card
      color="transparent"
      shadow={false}
      className={
        isService
          ? "service-card h-full rounded-xl border border-gray-200 bg-white"
          : "group h-full"
      }
    >
      <CardBody className="grid h-full content-start justify-center text-center">
        {isService ? (
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center">
            <Icon className="service-logo h-8 w-8" />
          </div>
        ) : (
          <div className="process-icon mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
        )}
        <Typography
          as="h3"
          variant="h5"
          color="blue-gray"
          className="mb-2"
        >
          {title}
        </Typography>
        <Typography
          className={
            isService
              ? "font-normal !text-gray-500"
              : "px-8 font-normal !text-gray-500"
          }
        >
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default SkillCard;
