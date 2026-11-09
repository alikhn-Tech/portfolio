"use client";

import { useEffect } from "react";

const BADGE_ATTRIBUTE = "data-tech-badge";
const PRESSED_CLASS = "tech-badge-pressed";
/** Matches the CSS animation duration. */
const DURATION_MS = 340;

/**
 * Adds the press animation to technology badges via a single delegated
 * listener, so the badges and their SVG logos stay server-rendered instead of
 * becoming client components.
 *
 * `pointerdown` covers mouse, touch and pen with one code path.
 */
export function TechnologyBadgeEffect({
  containerId,
}: {
  containerId: string;
}) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timers = new WeakMap<Element, number>();

    const onPointerDown = (event: Event) => {
      const target = event.target as Element | null;
      const badge = target?.closest(`[${BADGE_ATTRIBUTE}]`);
      if (!badge) {
        return;
      }

      // Restart cleanly on rapid repeat clicks.
      const existing = timers.get(badge);
      if (existing) {
        window.clearTimeout(existing);
      }
      badge.classList.remove(PRESSED_CLASS);
      void (badge as HTMLElement).offsetWidth;

      badge.classList.add(PRESSED_CLASS);

      const timer = window.setTimeout(() => {
        badge.classList.remove(PRESSED_CLASS);
        timers.delete(badge);
      }, DURATION_MS);

      timers.set(badge, timer);
    };

    container.addEventListener("pointerdown", onPointerDown);
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
    };
  }, [containerId]);

  return null;
}

export default TechnologyBadgeEffect;
