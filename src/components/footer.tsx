import Link from "next/link";
import { Typography } from "@/components/ui";
import { BASE_PATH, SITE } from "@/lib/site";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Background", href: "#background" },
  { label: "Expertise", href: "#expertise" },
  { label: "Technology", href: "#technology" },
  { label: "Projects", href: "#projects" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Resume", href: "#resume" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-8 pt-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-200 py-6 md:flex-row">
          <Typography className="text-center font-normal !text-gray-700">
            &copy; {CURRENT_YEAR} {SITE.name}
          </Typography>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <a
                      href={`${BASE_PATH}/${href}`}
                      className="footer-link text-sm font-normal text-gray-700 hover:text-gray-900"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="footer-link text-sm font-normal text-gray-700 hover:text-gray-900"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
