/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 120,
  images: {
    unoptimized: false,
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;