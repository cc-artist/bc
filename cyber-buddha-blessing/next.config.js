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
    // 确保App Router正常工作
    appDir: true,
    // 启用服务器操作
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // 配置路由
  trailingSlash: false,
  // 确保客户端组件正确处理
  reactStrictMode: true,
  // 配置构建时的环境变量
  env: {
    // 确保NEXT_PUBLIC_*环境变量在客户端可用
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    // NextAuth URL配置
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

export default nextConfig;