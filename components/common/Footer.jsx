import Link from "next/link";
import { siteConfig, navItems } from "@/data/site";

const socialEntries = [
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { key: "github", icon: "fa-brands fa-github", label: "GitHub" },
  { key: "twitter", icon: "fa-brands fa-x-twitter", label: "X / Twitter" },
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "youtube", icon: "fa-brands fa-youtube", label: "YouTube" },
];

/* Original Picto footer: dark-purple gradient panel, rounded top corners. */
export default function Footer() {
  const year = new Date().getFullYear();
  const hasSocials = socialEntries.some((s) => siteConfig.socials[s.key]);

  return (
    <footer className="mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="rounded-t-[2.5rem] px-6 py-14 text-white sm:px-12"
          style={{
            background:
              "linear-gradient(135deg, #3d1a6e 0%, #8534ea 100%)",
          }}
        >
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="text-2xl font-extrabold tracking-tight text-white"
              >
                Ali<span className="text-[#d9c4ff]">Khan</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                AI Automation &amp; Digital Solutions Specialist — building
                intelligent systems with AI agents, automation, web technology
                and performance marketing.
              </p>
              {hasSocials && (
                <ul className="mt-6 flex gap-3">
                  {socialEntries.map(
                    (s) =>
                      siteConfig.socials[s.key] && (
                        <li key={s.key}>
                          <a
                            href={siteConfig.socials[s.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:bg-white hover:text-[#8534ea]"
                          >
                            <i className={s.icon} />
                          </a>
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      scroll={item.href.includes("#") ? false : true}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/case-studies"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold">Get In Touch</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  {siteConfig.email ? (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="hover:text-white"
                    >
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span>
                      Email — <em>pending verification</em>
                    </span>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                  {siteConfig.whatsapp ? (
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <span>
                      WhatsApp — <em>pending verification</em>
                    </span>
                  )}
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="btn-outline mt-2 border-white/40 text-white hover:bg-white hover:text-[#8534ea]"
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/70">
            © {year} Ali Khan. All rights reserved. · Built with Next.js —
            original Picto design preserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
