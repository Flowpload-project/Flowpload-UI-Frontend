import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Required for Docker deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  // Proxy the public RSS feed to the gateway (nginx only routes /api to the backend).
  // GATEWAY_INTERNAL_URL is the in-network backend address (Docker service name).
  async rewrites() {
    const gateway = process.env.GATEWAY_INTERNAL_URL || 'http://crimson-ui-backend:4000';
    return [
      {
        source: '/feed/:path*',
        destination: `${gateway}/feed/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
