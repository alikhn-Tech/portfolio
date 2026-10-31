import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

/**
 * Shared page chrome (Navbar + main + Footer + scroll-to-top) so every route
 * reuses the exact same original Picto layout without duplicating JSX.
 * Server component — NavBar/ScrollToTop manage their own client islands.
 */
export default function PageShell({ children, heroShape = false }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {heroShape && <div className="hero-bg-shape" aria-hidden="true" />}
      <NavBar />
      <main id="top">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
