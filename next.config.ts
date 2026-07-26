import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site (out/) that GitHub Pages can serve.
  output: "export",
  // The default image optimizer needs a Node server; disable it for static hosting.
  images: {
    unoptimized: true,
  },
  // Add trailing slashes so static folder routes resolve cleanly on Pages.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
