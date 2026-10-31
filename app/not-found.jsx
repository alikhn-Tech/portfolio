import Link from "next/link";
import PageShell from "@/components/common/PageShell";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

/* 404 in the original Picto card language. */
export default function NotFound() {
  return (
    <PageShell heroShape>
      <section className="section-padding text-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="picto-card p-12">
            <h1 className="hero-title gradient-text">404</h1>
            <h2 className="section-title mt-2 text-2xl">Page not found</h2>
            <p className="text-gray mt-4 text-sm">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn-primary text-sm">
                Back To Home
              </Link>
              <Link href="/projects" className="btn-outline text-sm">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
