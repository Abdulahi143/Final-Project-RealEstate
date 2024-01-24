"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import DashboardFooter from './dashboard/admin/_component/DFooter';
import Footer from './components/footer/Footer';


const FootersManagement = () => {
  const pathName = usePathname();
  const isDashboardRoute = pathName?.startsWith('/dashboard/');

  return (
    <div>
      {/* Conditionally render the appropriate footer */}
      {isDashboardRoute ? <DashboardFooter /> : <Footer />}
    </div>
  );
}

export default FootersManagement;
