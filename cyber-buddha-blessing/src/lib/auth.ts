import { getServerSession } from 'next-auth';

// 定义简化的authOptions类型
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'default-secret-for-development-only',
};

// 导出getServerSession函数，供其他组件使用
export const getSession = () => getServerSession(authOptions);

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function isAdminAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}