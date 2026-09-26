import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate one HTML file per route so the site can be hosted without a
  // Node.js or Cloudflare server.
  output: "export",
  // Static hosting has no /_next/image optimizer endpoint.
  images: { unoptimized: true },
};

export default nextConfig;
