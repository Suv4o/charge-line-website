// Serves the built site (out/) on http://localhost:3000, resolving /privacy to privacy.html as a static
// host does, to check a build. Usage: npm run build && npm run serve [-- port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(import.meta.dirname, "..", "out");
const port = Number(process.argv[2] ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

async function file(path) {
  try {
    return (await stat(path)).isFile() ? path : null;
  } catch {
    return null;
  }
}

createServer(async (request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, "http://localhost").pathname)).replace(/^(\.\.[/\\])+/, "");
  const base = join(root, path);
  const found = (await file(base)) ?? (await file(`${base}.html`)) ?? (await file(join(base, "index.html")));
  const target = found ?? join(root, "404.html");
  const type = path === "/.well-known/api-catalog" ? "application/linkset+json" : types[extname(target)] ?? "application/octet-stream";
  response.writeHead(found ? 200 : 404, { "Content-Type": type });
  response.end(await readFile(target));
}).listen(port, () => console.log(`http://localhost:${port}`));
