import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata({ path: "/", description: site.description }),
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  applicationName: site.name,
  category: "travel",
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe8df" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1f33" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The theme script sets data-theme on <html> before React loads, so React mustn't mind it
    <html lang={site.locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script src="/theme.js" defer />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
