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

export default AdminLayout;
