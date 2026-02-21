import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

// 确保admin所有子路由都动态处理
export const dynamic = 'force-dynamic';

// 确保admin目录下的所有路由都使用动态渲染
export const dynamicParams = true;

export default AdminLayout;
