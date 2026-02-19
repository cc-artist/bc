/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保Vercel正确处理动态路由和客户端组件
  output: 'standalone',
  experimental: {
    // 确保构建过程能正确处理动态路由和客户端组件
    serverActions: true,
  },
  // 配置静态资源处理
  staticPageGenerationTimeout: 100,
  // 配置构建时的环境变量
  env: {
    // 确保NEXT_PUBLIC_*环境变量在客户端可用
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

export default nextConfig;