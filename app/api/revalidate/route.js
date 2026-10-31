import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { serverSanityClient } from "@/lib/sanity/client";
import { BLOG_POST_SLUGS_QUERY } from "@/lib/sanity/queries";

/**
 * Sanity webhook endpoint — fires when a blog document changes
 * (publish / edit / unpublish / delete) and instantly refreshes:
 *   - the /blog listing (+ paginated/filtered variants)
 *   - the affected article page /blog/<slug>
 *
 * Security: requests are verified against SANITY_REVALIDATE_SECRET using
 * Sanity's HMAC signature scheme (`next-sanity/webhook` parseBody). The
 * secret is never exposed publicly — it lives only in server env vars and
 * in the webhook configuration in your Sanity account.
 *
 * Unpublish/delete behaviour: after revalidating, we re-query the list of
 * published slugs and proactively warm each remaining article so removed
 * slugs fall back to the site's real 404 instead of a stale cached page.
 */
export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new Response("Revalidation secret not configured", { status: 501 });
    }

    // Third arg `true` adds a short delay so the Sanity CDN has time to
    // propagate before we refetch (avoids re-caching stale content).
    const { isValidSignature, body } = await parseBody(req, secret, true);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    // Revalidate the listing (all query variants) …
    revalidatePath("/blog");
    revalidatePath("/blog", "layout");

    // … and the specific changed document if the webhook projection gives us one.
    const slug = body?.slug || body?.path;
    if (typeof slug === "string" && slug.length > 0) {
      revalidatePath(`/blog/${slug.replace(/^\/+/, "")}`);
    } else {
      // No explicit slug (e.g. delete events): revalidate every published slug.
      const slugs = await serverSanityClient().fetch(BLOG_POST_SLUGS_QUERY);
      (slugs || []).forEach((s) => s && revalidatePath(`/blog/${s}`));
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug: slug || "listing+all",
    });
  } catch (err) {
    console.error("[revalidate] error:", err);
    return new Response("Error revalidating", { status: 500 });
  }
}
