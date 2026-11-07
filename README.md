# chargeline.au

The website for **Charge Line**, the iPhone app that plans EV road trips across Australia: what the app
does, Premium and its prices, questions, and the support, privacy and terms pages.

A static site: Next.js builds plain HTML, CSS and files into `out/`. No server, no cookies, no analytics.

## Commands

```sh
npm install
npm run dev          # http://localhost:3000, reloads as you edit
npm run build        # the static site, in out/
npm run serve        # serves out/ on http://localhost:3000
npm run typecheck
npm run images -- "<screenshots folder>"   # remake screenshots, icons and the social image
```

Node 24. Every package is at its latest version (`npm outdated` prints nothing). There's no ESLint on
purpose: Next.js 16 doesn't run it during builds, and its plugins don't support ESLint 10 or TypeScript 7
yet. Accessibility and SEO are checked with Lighthouse instead (below).

## Where things are

```
content/
├── site.ts          everything the site says about the app: features, prices, questions, screenshots
└── privacy.md, terms.md, support.md     the text pages, in Markdown
app/
├── layout.tsx       header, footer, the appearance script, site-wide metadata
├── page.tsx         the home page
├── privacy/, terms/, support/           the text pages (rendered from content/*.md at build time)
├── llms.txt/, llms-full.txt/, *.md/     files for AI agents (see below)
├── robots.ts, sitemap.ts, manifest.ts
├── icon.svg, favicon.ico, apple-icon.png
└── globals.css      the design system's colours (design-system/css/tokens.css), light and dark
components/          header, footer, screenshots, the appearance switch, icons, JSON-LD
lib/                 Markdown, structured data, agent files, page metadata
public/
├── screens/         app screenshots, AVIF with JPEG fallback, 1x and 2x
├── icons/, opengraph-image.png
├── _headers         security headers, caching, and content types for the agent files
└── .well-known/     security.txt, api-catalog
scripts/             images.sh (+ og.swift, favicon.mjs), serve.mjs
```

To change what the site says, edit `content/`. The home page, the structured data and the agent files all
read from `content/site.ts`, so they stay in step.

## Look and feel

The app's palette and tokens from `design-system/css/tokens.css`. Each colour has its light and dark value
in one place (`light-dark()` in `globals.css`). The page follows the device's appearance; the switch in the
header picks light or dark, remembered in the browser (`localStorage`) and applied before the page paints.

Small text meets WCAG AA (4.5:1). The app's coral and secondary grey don't on the light background, so
small text uses deeper steps of them; the brand coral stays for large text and decoration.

## Search engines and AI agents

- Titles, descriptions, canonical URLs, Open Graph and X cards on every page; `sitemap.xml`, `robots.txt`
  (everyone may read everything).
- schema.org JSON-LD: Organization, WebSite, MobileApplication (features, offers, screenshots), FAQPage,
  and on the support page a Dataset for the public charger list.
- [`/llms.txt`](https://llmstxt.org): what Charge Line is, key facts and where to read more.
  `/llms-full.txt` has the whole site in one file, and each page has a Markdown copy (`/index.md`,
  `/support.md`, `/privacy.md`, `/terms.md`), linked from the page with `rel="alternate"`.
- `/.well-known/api-catalog` (RFC 9727) lists the one public API: the charger list
  (`charge-line-server.fly.dev/v1/chargers/au`, ODbL).
- `/.well-known/security.txt` (RFC 9116).

Checked on 5 November 2026 with Lighthouse: 100 for performance, accessibility (light and dark), best
practices and SEO, on the home, support and privacy pages.

## When the app is on the App Store

- Set `appStoreUrl` in `content/site.ts`: "Coming soon" becomes a link, and the structured data and
  `llms.txt` get the download link.
- Swap the "Coming soon" label for Apple's official "Download on the App Store" badge
  (`components/AppStoreButton.tsx`); Apple's guidelines allow only that artwork, unchanged.
- Add Apple's Smart App Banner: `other: { "apple-itunes-app": "app-id=<id>" }` in `app/layout.tsx`'s
  metadata.
