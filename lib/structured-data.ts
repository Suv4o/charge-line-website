// schema.org JSON-LD: what the site, the app and the charger data are, for search engines and agents.
import { faq, freeFeatures, premiumFeatures, prices, screens, site } from "@/content/site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const appId = `${site.url}/#app`;

export const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icons/icon-512.png`,
  email: site.email,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.email,
    areaServed: "AU",
    availableLanguage: "en",
  },
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: site.locale,
  publisher: { "@id": organizationId },
};

const app = {
  "@type": "MobileApplication",
  "@id": appId,
  name: site.name,
  url: site.url,
  description: site.summary,
  operatingSystem: site.requires,
  applicationCategory: "TravelApplication",
  applicationSubCategory: "Electric vehicle trip planner",
  availableOnDevice: "iPhone",
  countriesSupported: "AU",
  inLanguage: site.locale,
  isAccessibleForFree: true,
  ...(site.appStoreUrl ? { downloadUrl: site.appStoreUrl, installUrl: site.appStoreUrl } : {}),
  image: `${site.url}/opengraph-image.png`,
  screenshot: Object.values(screens)
    .filter((screen) => !screen.name.startsWith("duo-"))
    .map((screen) => ({ "@type": "ImageObject", url: `${site.url}/screens/${screen.name}-800.jpg`, caption: screen.alt })),
  featureList: [...freeFeatures, ...premiumFeatures].map((feature) => `${feature.title}: ${feature.body}`),
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "AUD", description: "Unlimited trip planning, with every safety warning." },
    ...prices.map((price) => ({
      "@type": "Offer",
      name: `Premium: ${price.name}`,
      price: price.price.replace("A$", ""),
      priceCurrency: "AUD",
      description: `${price.price} ${price.per}. ${price.note}`,
    })),
  ],
  publisher: { "@id": organizationId },
};

export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    website,
    app,
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": appId },
      inLanguage: site.locale,
      dateModified: site.updated,
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#questions`,
      mainEntity: faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

/** A text page (privacy, terms, support), with its place on the site. */
export function pageGraph(path: string, name: string, description: string, extra: object[] = []) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        inLanguage: site.locale,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: site.name, item: site.url },
            { "@type": "ListItem", position: 2, name, item: url },
          ],
        },
      },
      ...extra,
    ],
  };
}

/** Charge Line's public list of Australia's chargers (on the support page). */
export const chargerDataset = {
  "@type": "Dataset",
  "@id": `${site.url}/support#charger-data`,
  name: "Australia's EV chargers (Charge Line)",
  description:
    "About 1,800 electric-vehicle charging sites across Australia, with their power, plugs, networks, opening hours, ways to pay, photos and nearby places. Built each day from OpenStreetMap and Open Charge Map.",
  url: `${site.url}/support#charger-data`,
  license: "https://opendatacommons.org/licenses/odbl/1-0/",
  isAccessibleForFree: true,
  creator: { "@id": organizationId },
  isBasedOn: ["https://www.openstreetmap.org", "https://openchargemap.org"],
  spatialCoverage: { "@type": "Place", name: "Australia" },
  distribution: [{ "@type": "DataDownload", contentUrl: site.chargerDataUrl, encodingFormat: "application/json" }],
};
