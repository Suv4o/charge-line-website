// Line icons for the site, drawn on a 24 × 24 grid in the app's style (SF Symbols-like, 2 pt strokes).
// Decorative: they sit beside text that says the same, so they're hidden from screen readers.
import type { ReactNode } from "react";

const paths = {
  route: (
    <>
      <path d="M6 19c5 0 2-8 6-8s1-6 6-6" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="5" r="2" />
    </>
  ),
  choices: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h11" />
      <path d="M4 18h7" />
    </>
  ),
  cup: (
    <>
      <path d="M4 9h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5v2.5M12 3.5v2.5" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.5 2.5 20h19L12 3.5Z" />
      <path d="M12 10v4.5" />
      <path d="M12 17.2v.1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" />
      <path d="m12.8 6.8-2.6 3.6h3.4l-2.4 3.4" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16v10.5H9l-5 4V5.5Z" />
      <path d="m9 11 2 2 4-4" />
    </>
  ),
  navigate: <path d="M3.5 11 20.5 3.5 13 20.5l-1.8-7.7L3.5 11Z" />,
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  live: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
    </>
  ),
  weather: (
    <>
      <path d="M8 19h9a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.6A3.2 3.2 0 0 0 8 19Z" />
      <path d="M17 4.5v1.5M21.2 6.3l-1 1M22.5 10.5H21" />
    </>
  ),
  cost: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2c-.5-.9-1.5-1.4-2.8-1.4-1.6 0-2.8.8-2.8 2.1 0 3 5.8 1.5 5.8 4.3 0 1.3-1.3 2.1-3 2.1-1.4 0-2.5-.6-3-1.6" />
      <path d="M12 6v1.8M12 16.3V18" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  send: (
    <>
      <path d="M21 3 10 14" />
      <path d="M21 3 14.5 21l-4.5-7-7-4.5L21 3Z" />
    </>
  ),
  carplay: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2.5" />
      <path d="M9 21h6M12 17v4" />
      <path d="m10.5 9 4 2-4 2V9Z" />
    </>
  ),
  learn: (
    <>
      <path d="m3.5 17 5.5-5.5 4 4 7.5-7.5" />
      <path d="M15 8h5.5v5.5" />
    </>
  ),
  bookmark: <path d="M6.5 3.5h11v17L12 16.5l-5.5 4v-17Z" />,
  check: <path d="m4.5 12.5 4.5 4.5 10.5-10.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
