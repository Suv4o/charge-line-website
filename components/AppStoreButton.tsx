import { site } from "@/content/site";
import { Icon } from "./Icons";

/**
 * Where to get the app. Until it's on the App Store (site.appStoreUrl), a "Coming soon" label.
 * Once it's live, swap this for Apple's official "Download on the App Store" badge (Apple's marketing
 * guidelines allow only that artwork, unchanged, with the Apple logo).
 */
export function AppStoreButton() {
  if (site.appStoreUrl) {
    return (
      <a className="soon" href={site.appStoreUrl}>
        <Icon name="phone" />
        <span>
          <small>Download on the</small>
          App Store
        </span>
      </a>
    );
  }
  return (
    <p className="soon">
      <Icon name="phone" />
      <span>
        <small>Coming soon on the</small>
        App Store
      </span>
    </p>
  );
}
