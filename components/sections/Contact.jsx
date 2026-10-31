"use client";

import Link from "next/link";
import { useState } from "react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

const initialForm = { name: "", email: "", subject: "", message: "" };

/* Original Picto contact section: form card + info column. Posts to the n8n
   Form-Trigger webhook when NEXT_PUBLIC_N8N_WEBHOOK_URL is configured;
   otherwise falls back to a mailto link. No secrets are exposed client-side. */
export default function Contact({ showHeading = true }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setStatus("sending");
    try {
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            subject: form.subject.trim() || "Portfolio enquiry",
            message: form.message.trim(),
            source: "ali-khan-portfolio/contact-form",
          }),
        });
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      } else {
        // Webhook not configured yet — open a prefilled email instead.
        const to = encodeURIComponent("");
        const subject = encodeURIComponent(form.subject || "Portfolio enquiry");
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
        );
        window.location.href = `mailto:?to=${to}&subject=${subject}&body=${body}`;
      }
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
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
              <li className="flex items-center gap-3">
                <span className="icon-circle !h-10 !w-10 !text-base">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                </span>
                <span className="text-gray">
                  Email:{" "}
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL ? (
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                      className="font-medium text-[var(--main-color)]"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </a>
                  ) : (
                    <em>pending verification</em>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="icon-circle !h-10 !w-10 !text-base">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </span>
                <span className="text-gray">
                  WhatsApp:{" "}
                  {process.env.NEXT_PUBLIC_WHATSAPP ? (
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--main-color)]"
                    >
                      Message me
                    </a>
                  ) : (
                    <em>pending verification</em>
                  )}
                </span>
              </li>
            </ul>
            {!WEBHOOK_URL && (
              <p className="pending-chip mt-6 inline-block">
                Form delivery pending: set NEXT_PUBLIC_N8N_WEBHOOK_URL
              </p>
            )}
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
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      Sending…
                      <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p className="text-sm font-medium text-green-700" role="status">
                    <i className="fa-solid fa-circle-check mr-1" aria-hidden="true" />
                    Thank you! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    <i className="fa-solid fa-circle-exclamation mr-1" aria-hidden="true" />
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
              </div>
            </form>

            <p className="text-gray mt-6 text-xs">
              Prefer another channel? Visit my{" "}
              <Link href="/projects" className="text-[var(--main-color)] hover:underline">
                projects
              </Link>{" "}
              first, then reach out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
