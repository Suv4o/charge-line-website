import type { NextConfig } from "next";

// A static site: `next build` writes plain HTML, CSS and files to out/.
const nextConfig: NextConfig = {
  output: "export",
  // No image server in a static export; the screenshots are already sized (scripts/images.sh).
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
