/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 100,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['next-auth', 'react', 'react-dom'],
  },
};

export default nextConfig;