'use client'

import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import isAdminAuth from "@/utils/isAdminAuth";

const navItems = [{
    name: 'Listed Cars',
    path: '/admin',
  }, {
    name: 'Add New Car',
    path: '/admin/add-car'
  },{
    name: 'Logout',
    path: '/admin/logout'
}]

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardLayout navItems={navItems}>
        {children}
    </DashboardLayout>
  );
}

export default isAdminAuth(AdminLayout);
