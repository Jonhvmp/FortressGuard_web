import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fortressguard.onrender.com/api/:path*',
      },
    ]
  },
  // Configurações para produção
  experimental: {
    serverActions: {
      allowedOrigins: ['https://fortressguard.onrender.com'],
    },
  },
};

export default nextConfig;
