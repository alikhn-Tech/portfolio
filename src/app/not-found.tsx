import Link from "next/link";
import { Footer, Navbar } from "@/components";
import { buttonClassName, Typography } from "@/components/ui";

/**
 * Rendered for unmatched routes (and `notFound()` calls). Next serves this with
 * a 404 status and adds a `noindex` robots directive automatically, so no
 * metadata export is needed here.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="px-8 py-28">
          <div className="container mx-auto max-w-2xl text-center">
            <Typography color="blue-gray" className="mb-2 font-bold uppercase">
              404
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 text-4xl lg:text-5xl"
            >
              Page not found
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto mb-10 w-full !text-gray-500"
            >
              The page you are looking for doesn&apos;t exist or has moved. The
              links below will get you back on track.
            </Typography>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" className={buttonClassName()}>
                Back to home
              </Link>
              <Link
                href="/blog"
                className={buttonClassName({ variant: "outlined" })}
              >
                Read the blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
