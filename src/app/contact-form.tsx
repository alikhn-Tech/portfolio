"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@/components/ui";
import {
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { SITE } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Build a wa.me deep link with the message pre-filled. */
function whatsappHref(name: string, email: string, message: string) {
  const lines = [
    `Hi Ali, I'm ${name.trim()}.`,
    message.trim(),
    email.trim() ? `You can also reach me at ${email.trim()}.` : "",
  ].filter(Boolean);

  return `${SITE.whatsappUrl}?text=${encodeURIComponent(lines.join("\n\n"))}`;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = whatsappHref(name, email, message);
    setHandoffUrl(url);

    // wa.me opens the WhatsApp app on mobile and WhatsApp Web on desktop.
    // A synthetic anchor keeps the current tab in place and avoids
    // `window.open(..., "noopener")`, which always returns null.
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-8 py-16">
      <div className="container mx-auto mb-12 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Get in Touch
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:w-7/12"
        >
          Have a project, a role, or a question? Send a message on WhatsApp
          and I&apos;ll get back to you.
        </Typography>
      </div>
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
        <Card shadow={false} className="border border-gray-200 lg:col-span-3">
          <CardBody className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
              <Button type="submit" color="gray" className="w-full sm:w-auto">
                <WhatsAppIcon className="h-4 w-4" />
                Send on WhatsApp
              </Button>
              <Typography className="text-xs font-normal !text-gray-500">
                Opens WhatsApp with your message ready to send.
              </Typography>
              {handoffUrl && (
                <Typography className="text-xs font-normal !text-gray-500">
                  WhatsApp didn&apos;t open?{" "}
                  <a
                    href={handoffUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-gray-900 underline"
                  >
                    Open it here
                  </a>
                  .
                </Typography>
              )}
            </form>
          </CardBody>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card shadow={false} className="border border-gray-200">
            <CardBody className="p-6">
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Direct contact
              </Typography>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex min-w-0 items-center gap-3 text-gray-700 transition-colors hover:text-gray-900"
                  >
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="truncate text-sm font-medium">
                      {SITE.email}
                    </span>
                  </a>
                  <IconButton
                    variant="text"
                    color="gray"
                    size="sm"
                    onClick={copyEmail}
                    aria-label={
                      copied ? "Email address copied" : "Copy email address"
                    }
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4" />
                    )}
                  </IconButton>
                </li>
                <li>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-gray-700 transition-colors hover:text-gray-900"
                  >
                    <PhoneIcon aria-hidden="true" className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      WhatsApp {SITE.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-gray-700 transition-colors hover:text-gray-900"
                  >
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-gray-700 transition-colors hover:text-gray-900"
                  >
                    <ArrowTopRightOnSquareIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                    <span className="text-sm font-medium">{SITE.company}</span>
                  </a>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
