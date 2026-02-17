import React from 'react';
import { getSession } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// 明确告诉Next.js这个页面需要动态生成
export const dynamic = 'force-dynamic';

const AdminDashboard = async () => {
  // 检查管理员是否已登录
  let session = null;
  let error = null;
  
  try {
    session = await getSession();
  } catch (err) {
    error = err;
  }
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#1D1D1F] text-[#F5F5F7]">
      {/* 导航栏 */}
      <header className="bg-[#2C2C2E] border-b border-[#48484A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#86868B]">{session.user.email}</span>
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
        {/* 诊断信息 */}
        <div className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 mb-8 border border-[#48484A]">
          <h2 className="text-xl font-semibold text-white mb-4">Diagnostic Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
                <h3 className="text-[#86868B] text-sm mb-1">Environment</h3>
                <p className="text-white">{process.env.NODE_ENV || 'development'}</p>
              </div>
              <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
                <h3 className="text-[#86868B] text-sm mb-1">NEXTAUTH_SECRET Available</h3>
                <p className="text-white">{!!process.env.NEXTAUTH_SECRET ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Session Status</h3>
              <p className="text-white">{error ? `Error: ${error}` : 'Success'}</p>
            </div>
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Session Data</h3>
              <pre className="text-white text-sm overflow-x-auto">{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 寺庙管理卡片 */}
          <Link
            href="/admin/temples"
            className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 hover:bg-[#3A3A3C] transition-colors duration-300 border border-[#48484A]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Temple Management</h2>
                <p className="text-[#86868B] text-sm">Manage temple information</p>
              </div>
              <div className="bg-[#8676B6]/20 rounded-full p-3">
                <svg className="w-6 h-6 text-[#8676B6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* API Key管理卡片 */}
          <Link
            href="/admin/api-keys"
            className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 hover:bg-[#3A3A3C] transition-colors duration-300 border border-[#48484A]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">API Key Management</h2>
                <p className="text-[#86868B] text-sm">Securely manage AI API keys</p>
              </div>
              <div className="bg-[#5856D6]/20 rounded-full p-3">
                <svg className="w-6 h-6 text-[#5856D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </Link>

          {/* 支付配置卡片 */}
          <Link
            href="/admin/payment"
            className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 hover:bg-[#3A3A3C] transition-colors duration-300 border border-[#48484A]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Payment Configuration</h2>
                <p className="text-[#86868B] text-sm">Manage PayPal and other payment settings</p>
              </div>
              <div className="bg-[#FF9500]/20 rounded-full p-3">
                <svg className="w-6 h-6 text-[#FF9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* 系统概览 */}
        <div className="bg-[#2C2C2E] rounded-2xl shadow-xl p-6 border border-[#48484A]">
          <h2 className="text-xl font-semibold text-white mb-4">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Total Temples</h3>
              <p className="text-3xl font-bold text-white">6</p>
            </div>
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Active API Keys</h3>
              <p className="text-3xl font-bold text-white">1</p>
            </div>
            <div className="bg-[#1D1D1F]/50 rounded-xl p-4">
              <h3 className="text-[#86868B] text-sm mb-1">Payment Gateways</h3>
              <p className="text-3xl font-bold text-white">1</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;