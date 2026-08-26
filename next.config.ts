import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate one HTML file per route so the site can be hosted without a
  // Node.js or Cloudflare server.
  output: "export",
};

export default nextConfig;
