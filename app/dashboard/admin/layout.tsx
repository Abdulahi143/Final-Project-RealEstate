
import React from 'react';
import Sidebar from './_component/SideBar';
import Bottom from './_component/Bottom';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative dark:text-white dark:bg-black flex mt-2">
      <Sidebar />
      <Bottom/>
      <div className="p-8 flex-1">{children}</div>
    </div>
  );
}

export default AdminLayout;
