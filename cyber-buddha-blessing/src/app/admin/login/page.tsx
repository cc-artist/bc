'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState<number>(0);
  const router = useRouter();

  // 记录页面加载时间
  useEffect(() => {
    const loadTime = performance.now();
    setPageLoadTime(loadTime);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1D1F] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#2C2C2E] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-[#86868B]">Sign in to manage your temple booking system</p>
        </div>

        {/* 调试信息 */}
        <div className="bg-[#1D1D1F]/50 rounded-lg p-4 mb-6 border border-[#48484A]">
          <h3 className="text-sm font-medium text-[#8676B6] mb-2">Debug Information</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#86868B]">
            <div>
              <span className="font-medium text-[#F5F5F7]">Environment:</span> {process.env.NODE_ENV || 'development'}
            </div>
            <div>
              <span className="font-medium text-[#F5F5F7]">Page Load Time:</span> {pageLoadTime.toFixed(2)}ms
            </div>
            <div>
              <span className="font-medium text-[#F5F5F7]">Next.js Version:</span> {process.env.NEXT_PUBLIC_NEXT_VERSION || 'unknown'}
            </div>
            <div>
              <span className="font-medium text-[#F5F5F7]">Build Time:</span> {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] rounded-lg p-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#86868B] mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full bg-[#3A3A3C] border border-[#48484A] rounded-lg px-4 py-3 text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#8676B6] focus:border-transparent"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-[#86868B] mb-1">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-[#3A3A3C] border border-[#48484A] rounded-lg px-4 py-3 text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#8676B6] focus:border-transparent"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8676B6] hover:bg-[#8676B6]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-[#6E6E73]">
          <p>Use the default credentials for testing:</p>
          <p className="mt-1">Email: admin@example.com</p>
          <p>Password: admin123</p>
        </div>

        <div className="mt-6 text-center text-xs text-[#6E6E73]">
          <p>© {new Date().getFullYear()} Cyber Buddha Admin Panel</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;