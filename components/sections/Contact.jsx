"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site";

/* Verified contact details (see data/site.js). */
const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/[^0-9]/g, ""); // 923215720722
const CONTACT_EMAIL = siteConfig.email; // alikhan.contact@gmail.com

const initialForm = { name: "", email: "", subject: "", message: "" };

/* Build the professional WhatsApp message from the form fields and encode it
   for the official click-to-chat URL: https://wa.me/<number>?text=<encoded>. */
export function buildWhatsAppMessage({ name, email, subject, message }) {
  const lines = [
    "Hello Ali,",
    "",
    "I would like to discuss a project with you.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
  ];
  if (subject) lines.push(`Subject: ${subject}`);
  lines.push("", "Project Details:", message, "", "I look forward to hearing from you.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(form) {
  const text = buildWhatsAppMessage(form);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Original Picto contact section: form card + info column.
   The form no longer depends on an n8n webhook — submitting opens WhatsApp
   with a pre-filled, professionally formatted message via the official
   click-to-chat URL. The visitor always reviews and sends the message
   manually inside WhatsApp; we never claim automatic delivery. If a popup
   blocker prevents the new tab from opening, a direct WhatsApp link is shown
   and the visitor's typed details are preserved. No secrets are exposed. */
export default function Contact({ showHeading = true }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | opened | blocked
  const [waLink, setWaLink] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "Please write a message (at least 10 characters).";
    return e;
  };

  const handleChange = (ev) => {
    setForm((f) => ({ ...f, [ev.target.name]: ev.target.value }));
    setErrors((e) => ({ ...e, [ev.target.name]: undefined }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    const url = buildWhatsAppUrl(trimmed);
    setWaLink(url);

    // Try to open WhatsApp in a new tab. window.open returns null when the
    // browser blocks the popup — in that case we keep everything intact and
    // present the direct link instead. The typed message is NEVER cleared,
    // because the visitor still has to press Send inside WhatsApp.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win && !win.closed) {
      setStatus("opened");
    } else {
      setStatus("blocked");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeading && (
          <div className="text-center">
            <span className="sub-title">Contact</span>
            <h2 className="section-title mt-3">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Intelligent</span>
            </h2>
          </div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Info column */}
          <div className="picto-card p-8 sm:p-10 lg:col-span-2">
            <h3 className="text-xl font-bold">Work With Me</h3>
            <p className="text-gray mt-3 text-sm leading-relaxed">
              Have a process you want automated, a website you need built, or
              an AI agent idea? Tell me about it — I usually reply within one
              business day.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              {/* WhatsApp is the primary channel. */}
              <li className="flex items-center gap-3">
                <span className="icon-circle !h-10 !w-10 !text-base">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </span>
                <span className="text-gray">
                  WhatsApp:{" "}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--main-color)]"
                  >
                    {siteConfig.whatsappDisplay || siteConfig.whatsapp}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="icon-circle !h-10 !w-10 !text-base">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                </span>
                <span className="text-gray">
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-[var(--main-color)]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Form column */}
          <div className="picto-card p-8 sm:p-10 lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate aria-live="polite">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="mb-1 block text-sm font-semibold">
                    Your Name *
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-email" className="mb-1 block text-sm font-semibold">
                    Your Email *
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="cf-subject" className="mb-1 block text-sm font-semibold">
                  Subject
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  className="form-input"
                  placeholder="AI automation project enquiry"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="cf-message" className="mb-1 block text-sm font-semibold">
                  Message *
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  className="form-input resize-y"
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-primary">
                  Send Message on WhatsApp
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </button>

                {status === "opened" && (
                  <p className="text-sm font-medium text-green-700" role="status">
                    <i className="fa-solid fa-circle-check mr-1" aria-hidden="true" />
                    WhatsApp is opening with your message pre-filled — please
                    review it and press Send there to deliver it.
                  </p>
                )}
                {status === "blocked" && (
                  <p className="text-sm font-medium text-[var(--main-color)]" role="status">
                    <i className="fa-solid fa-link mr-1" aria-hidden="true" />
                    Your browser blocked the new tab. Your details are safe in
                    the form —{""}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      open WhatsApp here instead
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>

            <p className="text-gray mt-6 text-xs">
              Prefer another channel? Reach me directly on{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--main-color)] hover:underline"
              >
                WhatsApp ({siteConfig.whatsappDisplay || siteConfig.whatsapp})
              </a>{" "}
              or by email at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--main-color)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              . You can also browse my{" "}
              <Link href="/projects" className="text-[var(--main-color)] hover:underline">
                projects
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
