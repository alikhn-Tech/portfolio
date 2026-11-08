import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Breakpoints carried over from Material Tailwind so the layout keeps the
    // same proportions it was designed with. Tailwind derives `.container`
    // max-widths from these automatically.
    screens: {
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      "2xl": "1320px",
    },
  },
  plugins: [],
};

export default config;
