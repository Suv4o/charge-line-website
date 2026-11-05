import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <img src="/icon.svg" alt="" width={30} height={30} />
              {site.name}
            </Link>
            <p>
              {site.tagline}. Charging stops planned for your car, on iPhone and CarPlay.
            </p>
          </div>
          <nav aria-labelledby="footer-help">
            <h2 id="footer-help">Help</h2>
            <ul>
              <li>
                <Link href="/support">Support</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Link href="/privacy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of use</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-data">
            <h2 id="footer-data">Data and agents</h2>
            <ul>
              <li>
                <Link href="/support#charger-data">Where the charger data comes from</Link>
              </li>
              <li>
                <a href={site.chargerDataUrl}>Australia&apos;s chargers (JSON, ODbL)</a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt, for AI agents</a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="legal-line">
          © {new Date(site.updated).getFullYear()} {site.name}. Tesla is a trademark of Tesla, Inc. Google Maps is a trademark of
          Google LLC. Apple, iPhone, App Store and CarPlay are trademarks of Apple Inc. Charge Line is not affiliated with or
          endorsed by Tesla, Google or Apple.
        </p>
      </div>
    </footer>
  );
}
