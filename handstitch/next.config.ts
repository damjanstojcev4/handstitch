// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  // Ensure static files are served from root
  basePath: '', // Explicitly set to empty (default)

  // Optional: Add assetPrefix if you need it
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : '',
};

export default withNextIntl(nextConfig);