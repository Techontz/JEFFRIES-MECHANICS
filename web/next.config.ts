import type { NextConfig } from "next";

/**
 * Static export: `next build` writes plain HTML/CSS/JS to `out/`, which can be uploaded to any
 * web host (GoDaddy cPanel, Vercel). Live data (form options, job openings, projects) is
 * fetched from the Laravel API in the browser. Security headers live in public/.htaccess.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // No image server on static hosting; photos are served as-is.
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
