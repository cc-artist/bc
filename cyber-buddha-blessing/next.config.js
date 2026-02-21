/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保Vercel正确处理动态路由
  output: 'standalone',
  // 配置静态生成超时时间
  staticPageGenerationTimeout: 120,
  // 配置图像优化
  images: {
    domains: [],
    unoptimized: false,
  },
  // 优化动态路由处理
  experimental: {
    // 提高动态路由的处理效率
    optimizePackageImports: ['next-auth', 'react', 'react-dom'],
    // 启用服务器操作
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // 配置路由
  trailingSlash: false,
  // 确保客户端组件正确处理
  reactStrictMode: true,
};

export default nextConfig;