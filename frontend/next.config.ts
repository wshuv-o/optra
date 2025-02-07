import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ['scontent.cdninstagram.com', 'lookaside.fbsbx.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["https://nextjs-14-0-2-bug-report-4ea064a57303.herokuapp.com"],
    }
  }
};

export default nextConfig;