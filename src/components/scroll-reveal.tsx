"use client";

import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` blocks as they scroll into view.
 *
 * Content is visible by default. The hidden state only applies once
 * `reveal-ready` is set on <html>, and elements already on screen are marked
 * before that happens — so nothing flashes out and nothing is hidden if
 * JavaScript never runs.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (targets.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Anything already in view is shown straight away (no first-paint flash).
    const viewportHeight = window.innerHeight;
    for (const element of targets) {
      if (
        reduceMotion ||
        element.getBoundingClientRect().top < viewportHeight * 0.9
      ) {
        element.classList.add("is-revealed");
      }
    }

    if (reduceMotion) {
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    for (const element of targets) {
      if (!element.classList.contains("is-revealed")) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

export default ScrollReveal;
