import { defineQuery } from "next-sanity";

/*
 * GROQ queries for the public blog. All listing/detail queries filter on
 * `!(_id in path("drafts.**")) && defined(publishedAt)` so DRAFTS NEVER
 * appear publicly.
 * (Sanity stores drafts as documents with an id prefixed "drafts.".)
 */

export const POSTS_PER_PAGE = 9;

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt)]
  | order(publishedAt desc)[0...9]{
    _id,
    "slug": slug.current,
    title,
    excerpt,
    "category": category->title,
    publishedAt,
    readingTime,
    featured,
    "image": mainImage.asset->{url, altText, alt},
    "tags": tags[]->name
  }
`);

export const FEATURED_POST_QUERY = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt) && featured]
  | order(publishedAt desc)[0]{
    _id,
    "slug": slug.current,
    title,
    excerpt,
    "category": category->title,
    publishedAt,
    readingTime,
    featured,
    "image": mainImage.asset->{url, altText, alt},
    "tags": tags[]->name
  }
`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt)].slug.current
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    excerpt,
    body,
    seo,
    publishedAt,
    readingTime,
    featured,
    "author": author->{name, role},
    "category": category->{"name": title, "slug": slug.current},
    "tags": tags[]->{name, "slug": slug.current},
    "image": mainImage.asset->{url, altText, alt},
    "relatedPosts": *[
      _type == "post"
      && !(_id in path("drafts.**"))
      && defined(publishedAt)
      && references(^._id)
      && slug.current != ^.slug.current
    ][0...3]{
      _id,
      "slug": slug.current,
      title,
      excerpt,
      "category": category->title,
      publishedAt,
      readingTime,
      "image": mainImage.asset->{url, altText, alt}
    }
  }
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && !(_id in path("drafts.**"))]{
    title,
    "slug": slug.current,
    "postCount": count(*[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt) && references(^._id)])
  } | order(title asc)
`);

// Paginated + optionally category-filtered listing.
// GROQ slice bounds must be constant numbers, so start/end are validated
// integers interpolated into the query string by fetch helpers below.
export function postsQuery(start, end, categorySlug = null) {
  const filter = categorySlug
    ? `&& category->slug.current == "${String(categorySlug).replace(/[^a-z0-9-]/gi, "")}"`
    : "";
  return defineQuery(`
    *[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt) ${filter}]
    | order(publishedAt desc)[${Math.trunc(start)}...${Math.trunc(end)}]{
      _id,
      "slug": slug.current,
      title,
      excerpt,
      "category": category->title,
      publishedAt,
      readingTime,
      featured,
      "image": mainImage.asset->{url, altText, alt},
      "tags": tags[]->name
    }
  `);
}

export function postsCountQuery(categorySlug = null) {
  const filter = categorySlug
    ? `&& category->slug.current == "${String(categorySlug).replace(/[^a-z0-9-]/gi, "")}"`
    : "";
  return defineQuery(`
    count(*[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt) ${filter}])
  `);
}
