// What AI agents read: /llms.txt (the llmstxt.org format: what this is, and where to look), Markdown
// copies of each page (/index.md, /privacy.md …) and everything in one file (/llms-full.txt).
import { faq, freeFeatures, hero, networks, premiumFeatures, premiumSmallPrint, prices, site, steps } from "@/content/site";
import { readPage, type PageName } from "./markdown";

const pages: { name: PageName; title: string; about: string }[] = [
  { name: "support", title: "Support", about: "contact, common questions, and where the charger data comes from" },
  { name: "privacy", title: "Privacy policy", about: "what stays on the iPhone, and what's sent to which service" },
  { name: "terms", title: "Terms of use", about: "plans are a guide; Premium, renewals and refunds; your rights" },
];

const availability = site.appStoreUrl ? `on the App Store: ${site.appStoreUrl}` : "coming soon to the App Store";

const facts = [
  `- What: an iPhone app that plans electric-vehicle road trips: the charging stops, how long to charge at each, and the battery you'll arrive with`,
  `- Platform: iPhone (${site.requires}) and CarPlay. No Android or web version`,
  `- Where: Australia only`,
  `- Cars: ${site.carModels} models from ${site.carBrands} brands sold in Australia`,
  `- Networks: ${networks.join(", ")}, and other chargers on the map`,
  `- Price: free, unlimited planning. Premium is ${prices.map((p) => `${p.price} ${p.per} (${p.name})`).join(", ")}`,
  `- Accounts, ads, analytics: none`,
  `- Availability: ${availability}`,
  `- Contact: ${site.email}`,
];

/** The home page as Markdown. */
export function homeMarkdown(): string {
  const list = (items: { title: string; body: string }[]) => items.map((i) => `- **${i.title}.** ${i.body}`).join("\n");
  return [
    `# ${site.title}`,
    "",
    hero.lead,
    "",
    facts.join("\n"),
    "",
    "## How it works",
    "",
    steps.map((step, i) => `${i + 1}. **${step.title}.** ${step.body}`).join("\n"),
    "",
    "## Free, as often as you drive",
    "",
    list(freeFeatures),
    "",
    "## Charge Line Premium",
    "",
    list(premiumFeatures),
    "",
    prices.map((p) => `- **${p.name}:** ${p.price} ${p.per}. ${p.note}`).join("\n"),
    "",
    premiumSmallPrint,
    "",
    "## Questions",
    "",
    faq.map(({ question, answer }) => `### ${question}\n\n${answer}`).join("\n\n"),
    "",
  ].join("\n");
}

export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.summary}`,
    "",
    facts.join("\n"),
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/index.md): what the app does, its features, Premium and prices, and common questions`,
    ...pages.map((page) => `- [${page.title}](${site.url}/${page.name}.md): ${page.about}`),
    "",
    "## Data",
    "",
    `- [Australia's EV chargers (JSON)](${site.chargerDataUrl}): Charge Line's list of about 1,800 charging sites, with power, plugs, network, opening hours, ways to pay, photos and nearby places. Built daily from OpenStreetMap and Open Charge Map. Free to use under the Open Database License (ODbL 1.0); credit OpenStreetMap contributors and Open Charge Map. Supports ETag / If-None-Match.`,
    "",
    "## Optional",
    "",
    `- [Everything on this site in one file](${site.url}/llms-full.txt)`,
    "",
  ].join("\n");
}

export function pageMarkdown(name: PageName): string {
  return readPage(name).markdown;
}

export function llmsFullTxt(): string {
  return [homeMarkdown(), ...pages.map((page) => pageMarkdown(page.name))].join("\n---\n\n");
}

/** A text file for agents, built when the site is built (static export). */
export function textResponse(body: string, type: "text/plain" | "text/markdown") {
  return new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });
}
