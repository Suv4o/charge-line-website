"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The header's links, with the current page marked for screen readers (aria-current). A client component
 * only to learn the path when pages are built: none of this reaches the browser (scripts/static-only.mjs).
 */
export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <ul>
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} aria-current={href === pathname ? "page" : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
