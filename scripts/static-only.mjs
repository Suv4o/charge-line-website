// Removes React's browser code from the built site (out/), leaving plain HTML and CSS, the structured data,
// and public/theme.js. Nothing on the site needs React in the browser. Without it, a host adding to the
// pages can't break them (React rebuilds a page whose HTML isn't exactly what it rendered), and each visit
// is about 190 KB and 13 requests lighter. Runs after `next build` (npm run build).
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "out");

async function filesIn(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(folder, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    }),
  );
  return nested.flat();
}

const keepsScript = (attributes, body) =>
  attributes.includes('type="application/ld+json"') ||
  attributes.includes('src="/theme.js"') ||
  body.startsWith("try{var t=localStorage");

const files = await filesIn(root);
// public/callback/ is written by hand: it has no React code, and needs its own script
const pages = files.filter((file) => file.endsWith(".html") && file !== join(root, "callback", "index.html"));

for (const page of pages) {
  const html = await readFile(page, "utf8");
  const plain = html
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g, (tag, attributes, body) => (keepsScript(attributes, body) ? tag : ""))
    .replace(/<link\b[^>]*\bas="script"[^>]*>/g, "");

  // A future Next.js could change what it writes: stop the build rather than publish a half-stripped page
  const scripts = plain.match(/<script\b/g)?.length ?? 0;
  if (/_next\/static\/[^"]*\.js|__next_f|TURBOPACK/.test(plain) || !plain.includes('src="/theme.js"') || scripts < 2) {
    throw new Error(`static-only: unexpected scripts left in ${page}`);
  }
  await writeFile(page, plain);

  // The browser code's copies of this page: privacy.txt, and the privacy/ folder
  const base = page.slice(0, -".html".length);
  await rm(`${base}.txt`, { force: true });
  await rm(base, { recursive: true, force: true });
}

const unused = files.filter((file) => file.endsWith(".js") || /[/\\]__next[^/\\]*\.txt$/.test(file));
await Promise.all(unused.filter((file) => !file.endsWith("theme.js")).map((file) => rm(file, { force: true })));

console.log(`static-only: ${pages.length} pages without React's browser code`);
