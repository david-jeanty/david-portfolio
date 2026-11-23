import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/decision-brief", destination: "/tinder", permanent: true },
    ];
  },
};

export default nextConfig;
