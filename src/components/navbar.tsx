"use client";

import React from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Button, IconButton, Typography } from "@/components/ui";

const NAV_MENU = [
  { name: "Background", href: "#background" },
  { name: "Expertise", href: "#expertise" },
  { name: "Technology", href: "#technology" },
  { name: "Projects", href: "#projects" },
  { name: "How I Work", href: "#how-i-work" },
  { name: "Resume", href: "#resume" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex items-center justify-between px-8 py-3 lg:px-0">
        <Typography
          as="a"
          href="#home"
          color="blue-gray"
          className="text-lg font-bold"
        >
          Ali Khan
        </Typography>
        <nav aria-label="Main navigation">
          <ul className="ml-10 hidden items-center gap-8 lg:flex">
            {NAV_MENU.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  className="font-medium text-gray-900 transition-colors hover:text-gray-600"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="hidden lg:block">
          <Button color="gray">Contact</Button>
        </a>
        <IconButton
          variant="text"
          color="gray"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="ml-auto lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      {open && (
        <div className="container mx-auto border-t border-gray-200 px-8 pb-6 lg:px-0">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-4 pt-4">
              {NAV_MENU.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="font-medium text-gray-900"
                  >
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="font-medium text-gray-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
