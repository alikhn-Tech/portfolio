"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { legacyHashRoutes } from "@/data/site";

/**
 * Handles legacy Vite one-page hash links such as `/#profile`, `/#portfolio`
 * and `/contact#home`. When a visitor lands on the home page with a known
 * legacy hash, they are redirected to the matching App-Router route (with the
 * new anchor preserved where relevant). Native smooth scrolling on the home
 * page itself is untouched — this only runs when a legacy hash is present.
 */
export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const target = legacyHashRoutes[hash];
    if (target && target !== "/") {
      router.replace(target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
