import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { heroData, siteConfig } from "@/data/site";

/* Server-rendered profile image: shows the real photo as soon as it exists
   at public/images/profile.jpg, otherwise renders nothing (the styled "AK"
   monogram behind it acts as the placeholder). No client event handlers, so
   this is safe to pass through async server components. */
function ProfileImage() {
  const photoPath = path.join(process.cwd(), "public", "images", "profile.jpg");
  if (!fs.existsSync(photoPath)) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile.jpg"
      alt="Portrait of Ali Khan, AI Automation & Digital Solutions Specialist"
      className="h-full w-full object-cover"
    />
  );
}

/* Original Picto hero/introduction layout: badge, big Work Sans title with
   gradient word, description, two pill CTAs, decorative dots + radial glow. */
export default function Introduction() {
  return (
    <section id="home" className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-16">
        <div>
          <span className="sub-title">
            <i
              className="fa-solid fa-circle-dot mr-2 text-xs"
              aria-hidden="true"
            />
            {siteConfig.name} — Portfolio
          </span>

          <h1 className="hero-title mt-4">
            Hi, I&apos;m {siteConfig.name}. I&apos;m a{" "}
            <span className="gradient-text">
              {heroData.designerTitle}
            </span>{" "}
            <br className="hidden sm:block" />
            {heroData.developerTitle}
          </h1>

          <p className="text-gray mt-6 max-w-xl leading-relaxed">
            {heroData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              {heroData.ctaPrimary}
              <i
                className="fa-solid fa-arrow-right"
                aria-hidden="true"
              />
            </Link>
            <Link href="/projects" className="btn-outline">
              {heroData.ctaSecondary}
            </Link>
          </div>

          {siteConfig.cvUrl && (
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-[var(--main-color)]"
            >
              <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
              Download CV
            </a>
          )}
        </div>

        {/* Hero visual — original circular profile frame with orbit decorations */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            className="dots-shape absolute -left-6 -top-6 h-24 w-24 rounded-lg"
            aria-hidden="true"
          />
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-white shadow-[0_30px_60px_-25px_rgba(133,52,234,0.4)]">
            {/* Real photo appears automatically once you add it at
                public/images/profile.jpg — no code change needed.
                Server-rendered fallback (no inline event handlers) keeps
                this safe to render from async server components. */}
            <ProfileImage />
            <div
              className="absolute inset-0 flex items-center justify-center bg-[rgba(133,52,234,0.12)] text-6xl font-extrabold text-[var(--main-color)]"
              aria-hidden="true"
            >
              AK
            </div>
          </div>
          <div
            className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(133,52,234,0.25) 0%, rgba(133,52,234,0) 70%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
