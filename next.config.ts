import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com" }],
  },
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
