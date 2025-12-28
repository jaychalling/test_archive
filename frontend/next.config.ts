import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '2026puritytest.com',
          },
        ],
        destination: '/test/rice-purity',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.2026puritytest.com',
          },
        ],
        destination: '/test/rice-purity',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/:path*', // Proxy to Backend
      },
    ]
  },
};

export default nextConfig;
