import type { Metadata } from "next";
import { JsonLd } from "./JsonLd";
import { readPage, type PageName } from "@/lib/markdown";
import { pageMetadata } from "@/lib/metadata";
import { pageGraph } from "@/lib/structured-data";

const descriptions: Record<PageName, string> = {
  privacy:
    "What Charge Line keeps on your iPhone, what it sends to which service and why, and how to remove it. No accounts, no ads, no analytics.",
  terms: "The terms for using Charge Line and Charge Line Premium: plans are a guide, subscriptions and refunds, and your rights.",
  support:
    "Help with Charge Line: contact, common questions about plans, chargers, Premium and Tesla, and where the charger data comes from.",
};

export function textPageMetadata(name: PageName): Metadata {
  const { title } = readPage(name);
  return pageMetadata({ path: `/${name}`, title, description: descriptions[name] });
}

/** Privacy, terms and support: Markdown from content/, rendered when the site is built. */
export function TextPage({ name, extraData = [] }: { name: PageName; extraData?: object[] }) {
  const { title, lede, html } = readPage(name);
  return (
    <article className="prose">
      <JsonLd data={pageGraph(`/${name}`, title, descriptions[name], extraData)} />
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      <div className="body" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
