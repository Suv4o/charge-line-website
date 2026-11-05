import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";

/** A page written in Markdown (content/*.md): its title, the line under it, and its body. */
export type MarkdownPage = {
  title: string;
  lede: string;
  /** The body as HTML, for the page. Headings get IDs, so every section can be linked to. */
  html: string;
  /** The whole page as Markdown, for agents (`/privacy.md`, `/llms-full.txt`). */
  markdown: string;
};

export type PageName = "privacy" | "terms" | "support";

/** "Where the charger data comes from" → "where-the-charger-data-comes-from" */
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readPage(name: PageName): MarkdownPage {
  const source = readFileSync(join(process.cwd(), "content", `${name}.md`), "utf8");
  // A heading may set its own ID: "### Where the charger data comes from {#charger-data}"
  const ids = new Map<string, string>();
  const markdown = source.replace(/^(#{1,6}) (.+?) \{#([\w-]+)\}$/gm, (_, hashes: string, text: string, id: string) => {
    ids.set(text, id);
    return `${hashes} ${text}`;
  });

  const [first, , lede, ...rest] = markdown.split("\n");
  const title = first.replace(/^# /, "");

  const marked = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        const id = ids.get(text) ?? slug(text);
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(rest.join("\n"), { async: false });
  return { title, lede, html, markdown };
}
