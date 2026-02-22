import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAppSession } from '@/lib/auth';

// Explicitly set runtime for server components
export const runtime = 'nodejs';

// Set dynamic rendering
export const dynamic = 'force-dynamic';

// Disable static generation
export const revalidate = 0;

const AdminDashboard = async () => {
  // 添加认证检查
  const session = await getAppSession();
  
  if (!session?.user) {
    redirect('/admin/login');
  }
  
  // 简化版管理员页面，用于测试路由是否正常工作
  return (
    <div className="min-h-screen bg-[#1D1D1F] text-[#F5F5F7]">
      {/* 导航栏 */}
      <header className="bg-[#2C2C2E] border-b border-[#48484A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#86868B]">Test User</span>
            <Link
              href="/api/auth/signout"
              className="bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 测试信息 */}
        <div className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 mb-8 border border-[#48484A]">
          <h2 className="text-xl font-semibold text-white mb-4">Test Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
                <h3 className="text-[#86868B] text-sm mb-1">Environment</h3>
                <p className="text-white">{process.env.NODE_ENV || 'development'}</p>
              </div>
              <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
                <h3 className="text-[#86868B] text-sm mb-1">Page Status</h3>
                <p className="text-white">Success - Admin page is accessible</p>
              </div>
            </div>
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Dynamic Export</h3>
              <p className="text-white">Enabled - Using 'force-dynamic' export</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 border border-[#48484A]">
          <h2 className="text-xl font-semibold text-white mb-4">Admin Dashboard</h2>
          <p className="text-[#86868B] mb-4">
            This is a simplified version of the admin dashboard for testing purposes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/login"
              className="bg-[#8676B6] hover:bg-[#8676B6]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              Go to Login Page
            </Link>
            <Link
              href="/"
              className="bg-[#1D1D1F]/50 hover:bg-[#1D1D1F]/70 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center border border-[#48484A]"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;