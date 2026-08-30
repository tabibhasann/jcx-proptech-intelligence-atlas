import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
