import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>This road doesn&apos;t go anywhere</h1>
      <p>The page you were looking for isn&apos;t here.</p>
      <div className="hero-actions">
        <Link className="button button-primary" href="/">
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
