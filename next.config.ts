import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_ID: "site-4",
  },
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
