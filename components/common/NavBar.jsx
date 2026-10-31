"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, legacyHashRoutes, siteConfig } from "@/data/site";

/* Original Picto navbar: sticky pill bar, purple accents, DaisyUI drawer for mobile. */
export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 shadow-[0_10px_30px_-15px_rgba(133,52,234,0.3)] backdrop-blur"
              : "bg-transparent"
          }`}
          aria-label="Main navigation"
        >
          {/* Logo — original text logo style */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-heading"
          >
            Ali<span className="gradient-text">Khan</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  scroll={item.href.includes("#") ? false : true}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link href="/contact" className="btn-primary text-sm">
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--main-color)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-3xl bg-white p-6 shadow-[0_20px_40px_-24px_rgba(133,52,234,0.3)] lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    scroll={item.href.includes("#") ? false : true}
                    className={`nav-link block text-lg ${
                      isActive(item.href) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
            {siteConfig.email && (
              <p className="mt-4 text-sm text-gray">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// Re-export so pages can resolve legacy hashes without extra imports.
export { legacyHashRoutes };
