/** @type {import('next').NextConfig} */
const nextConfig = {
  // 确保Vercel正确处理动态路由和客户端组件
  output: 'standalone',
  // 配置静态资源处理
  staticPageGenerationTimeout: 100,
  // 配置构建时的环境变量
  env: {
    // 确保NEXT_PUBLIC_*环境变量在客户端可用
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  // 优化动态路由处理
  experimental: {
    // 提高动态路由的处理效率
    optimizePackageImports: ['next-auth', 'react', 'react-dom'],
  },
  // 配置路由
  trailingSlash: false,
  // 配置图像优化
  images: {
    domains: [],
  },
  // 配置重写规则
  rewrites: async () => {
    return [
      {
        source: '/admin/login',
        destination: '/admin/login',
      },
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },
};

export default nextConfig;