
import React from 'react';
import Sidebar from './_component/sideBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-white dark:bg-black flex mt-2">
      <Sidebar />
      <div className="p-8 flex-1">{children}</div>
    </div>
  );
}

export default AdminLayout;
