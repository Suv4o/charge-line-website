import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * A page's title, description and link previews. Next.js replaces (not merges) openGraph and twitter
 * set by a page, so every page builds them whole from here.
 */
export function pageMetadata({ path, title, description }: { path: string; title?: string; description: string }): Metadata {
  const shownTitle = title ? `${title} · ${site.name}` : site.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: { "text/markdown": path === "/" ? "/index.md" : `${path}.md` } },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      url: path,
      title: shownTitle,
      description,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Charge Line: EV road trips across Australia, planned for your car" }],
    },
    twitter: { card: "summary_large_image", title: shownTitle, description, images: ["/opengraph-image.png"] },
  };
}
