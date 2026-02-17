import React from 'react';

// 为admin布局添加动态导出设置，确保所有admin路由都能正确处理
export const dynamic = 'force-dynamic';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default AdminLayout;
