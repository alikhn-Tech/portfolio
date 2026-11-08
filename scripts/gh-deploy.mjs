/**
 * Build and publish the static export to GitHub Pages.
 *
 * Usage:  node scripts/gh-deploy.mjs
 *         GH_PAGES_BASE_PATH=/my-repo node scripts/gh-deploy.mjs
 *
 * The base path defaults to the repository name, which is what GitHub Pages
 * project sites are served from (https://<user>.github.io/<repo>/).
 */
import { execFileSync } from "node:child_process";
import { basename, resolve } from "node:path";
import { writeFileSync } from "node:fs";

const repoFromEnv = process.env.GITHUB_REPOSITORY?.split("/")[1];
const folderName = basename(resolve(".")).replace(/-v?\d+(\.\d+)*$/, "");
const basePath = (process.env.GH_PAGES_BASE_PATH || repoFromEnv || folderName).replace(
  /^\/+|\/+$/g,
);

console.log(`Building with NEXT_PUBLIC_BASE_PATH=/${basePath}`);
execFileSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: `/${basePath}`,
    // GitHub Pages has no server, so the blog must be prerendered. This
    // requires at least one published post.
    STATIC_EXPORT: "1",
  },
});

// GitHub Pages runs Jekyll, which ignores directories starting with "_".
writeFileSync("out/.nojekyll", "");

execFileSync("npx", ["gh-pages", "-d", "out"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

console.log(`Deployed. Live at https://<your-user>.github.io/${basePath}/`);
