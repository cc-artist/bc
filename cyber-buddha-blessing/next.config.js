/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保Vercel正确处理动态路由
  experimental: {
    // appDir在Next.js 14+中已默认启用，无需显式配置
  },
  // 配置输出目录
  distDir: '.next',
  // 配置静态资源处理
  staticPageGenerationTimeout: 100,
  // 配置构建时的环境变量
  env: {
    // 确保NEXT_PUBLIC_*环境变量在客户端可用
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

export default nextConfig;