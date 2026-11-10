
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@/components/ui";
import { BASE_PATH } from "@/lib/site";

/**
 * `#hash` entries point at sections of the home page, so they are prefixed
 * with the base path to work from `/blog` too. Anything else is a real route.
 */
const NAV_MENU = [
  { name: "Background", href: "#background" },
  { name: "Expertise", href: "#expertise" },
  { name: "Technology", href: "#technology" },
  { name: "Projects", href: "#projects" },
  { name: "How I Work", href: "#how-i-work" },
  { name: "Resume", href: "#resume" },
  { name: "Blog", href: "/blog" },
];

const SECTION_HREFS = NAV_MENU.filter((item) => item.href.startsWith("#"));

/**
 * Sections to watch. `#contact` has no nav item (it is the CTA button), but it
 * still needs observing so the last link stops looking active once the visitor
 * reaches it.
 */
const OBSERVED_SECTION_IDS = [
  ...SECTION_HREFS.map(({ href }) => href.slice(1)),
  "contact",
];

function navHref(href: string) {
  return href.startsWith("#") ? `${BASE_PATH}/${href}` : href;
}

/**
 * Tracks which section sits in the middle of the viewport. A thin band
 * (45%–50% of the viewport height) is used so exactly one section is active at
 * a time and no scroll listener is needed.
 */
function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }

    const sections = OBSERVED_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [enabled]);

  return activeId;
}

function NavLink({
  name,
  href,
  active,
  onClick,
}: {
  name: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) {
 const className = `nav-link text-sm font-medium text-white${active ? " is-active" : ""}`;

  // `aria-current="true"` marks the section in view; `page` marks the route.
  if (href.startsWith("#")) {
    return (
      <a
        href={navHref(href)}
        onClick={onClick}
        className={className}
        aria-current={active ? "true" : undefined}
      >
        {name}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {name}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const onHome =
    pathname === "/" || pathname === `${BASE_PATH}/` || pathname === BASE_PATH;
  const activeSection = useActiveSection(onHome);

  const activeHref = onHome
    ? activeSection
      ? `#${activeSection}`
      : null
    : pathname.startsWith("/blog")
      ? "/blog"
      : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto px-8 py-3 lg:px-0">
        <div className="navbar-dark flex items-center justify-between rounded-full bg-black px-5 py-2.5 shadow-sm lg:px-6">
          {/* Brand logo */}
          <a
            href={navHref("#home")}
            aria-label="Ali Khan - Home"
            className="brand-link flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
          >
            <Image
              src="/ali-khan-logo.png"
              alt="Ali Khan"
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />
          </a>

          <nav aria-label="Main navigation">
            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, href }) => (
                <li key={name}>
                  <NavLink
                    name={name}
                    href={href}
                    active={activeHref === href}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <a href={navHref("#contact")} className="hidden lg:block">
            <Button color="white">Contact</Button>
          </a>

          <IconButton
            variant="text"
            color="white"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="ml-auto rounded-full lg:hidden"
          >
            {open ? (
              <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>

      {open && (
        <div className="container mx-auto px-8 pb-3 lg:px-0">
          <div className="nav-panel navbar-dark rounded-2xl bg-black px-6 pb-6 pt-2">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-4 pt-4">
                {NAV_MENU.map(({ name, href }) => (
                  <li key={name}>
                    <NavLink
                      name={name}
                      href={href}
                      active={activeHref === href}
                      onClick={closeMenu}
                    />
                  </li>
                ))}
                <li>
                  <a
                    href={navHref("#contact")}
                    onClick={closeMenu}
                    className="nav-link font-medium text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

