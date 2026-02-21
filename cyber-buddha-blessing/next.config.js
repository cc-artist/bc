/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 120,
  images: {
    domains: [],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['next-auth', 'react', 'react-dom'],
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;