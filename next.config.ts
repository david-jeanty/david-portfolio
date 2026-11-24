import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/decision-brief", destination: "/tinder", permanent: true },
      { source: "/brief_v2.pdf", destination: "/after-party-decision-brief.pdf", permanent: true },
      { source: "/David_Jeanty_Portfolio_Resume_2026.pdf", destination: "/David_Jeanty_Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
