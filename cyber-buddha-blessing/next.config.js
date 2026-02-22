/** @type {import('next').NextConfig} */
const nextConfig = {
  // 恢复standalone输出，这是Vercel推荐的配置
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
    // 移除appDir配置，Next.js 14默认启用
    // appDir: true,
  },
  trailingSlash: false,
  reactStrictMode: true,
  // 移除rewrites配置，让Vercel自动处理
};

export default nextConfig;