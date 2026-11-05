import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/content/site";

export const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#premium", label: "Premium" },
  { href: "/#questions", label: "Questions" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          <img src="/icon.svg" alt="" width={34} height={34} />
          {site.name}
        </Link>
        <nav className="site-nav" aria-label="Main">
          <NavLinks links={navigation} />
        </nav>
        {site.appStoreUrl ? (
          <a className="header-cta" href={site.appStoreUrl}>
            Get the app
          </a>
        ) : (
          <span className="header-cta">Coming soon</span>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
