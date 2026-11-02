"use client";

import Link from "next/link";
import { useState } from "react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const initialForm = { name: "", email: "", subject: "", message: "" };

/* Original Picto contact section: form card + info column. Posts to the n8n
   Form-Trigger webhook when NEXT_PUBLIC_N8N_WEBHOOK_URL is configured.
   Success is shown ONLY after the webhook responds with HTTP 2xx. When the
   webhook is not configured we never claim delivery — visitors see a clear
   fallback with real contact methods only (no empty mailto: links).
   No secrets are exposed client-side. */
export default function Contact({ showHeading = true }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | unconfigured

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

    // Webhook not configured: do NOT pretend the message was sent. Show a
    // clear fallback pointing to real contact methods (if any are provided).
    if (!WEBHOOK_URL) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
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
      // Success is shown only after an actual 2xx response from n8n.
      setStatus("sent");
      setForm(initialForm);
    } catch {
      // Network error / non-2xx: keep the typed message intact so nothing
      // is silently discarded; the visitor can retry or use another channel.
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
              {/* Only real, configured contact methods are shown — no
                  placeholder or empty links appear publicly. */}
              {CONTACT_EMAIL && (
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
              )}
              {process.env.NEXT_PUBLIC_WHATSAPP && (
                <li className="flex items-center gap-3">
                  <span className="icon-circle !h-10 !w-10 !text-base">
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                  </span>
                  <span className="text-gray">
                    WhatsApp:{" "}
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--main-color)]"
                    >
                      Message me
                    </a>
                  </span>
                </li>
              )}
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
                    Something went wrong and your message was not delivered.
                    Please try again
                    {CONTACT_EMAIL ? (
                      <>
                        {" "}or email{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    ) : (
                      "."
                    )}
                  </p>
                )}
                {status === "unconfigured" && (
                  <div
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[rgba(133,52,234,0.06)] p-4 text-sm"
                    role="alert"
                  >
                    <p className="font-semibold">
                      <i
                        className="fa-solid fa-triangle-exclamation mr-1 text-[var(--main-color)]"
                        aria-hidden="true"
                      />
                      The contact form is not available right now.
                    </p>
                    <p className="text-gray mt-1 leading-relaxed">
                      Your message has <strong>not</strong> been sent — it is
                      still in the form above, so nothing is lost.
                      {CONTACT_EMAIL || process.env.NEXT_PUBLIC_WHATSAPP ? (
                        <>
                          {" "}Please reach me using one of the contact methods
                          listed alongside this form.
                        </>
                      ) : (
                        <>
                          {" "}Please visit my{" "}
                          <Link
                            href="/contact"
                            className="text-[var(--main-color)] hover:underline"
                          >
                            contact page
                          </Link>{" "}
                          for other ways to get in touch.
                        </>
                      )}
                    </p>
                  </div>
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
