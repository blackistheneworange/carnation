'use client'

import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import isAuth from "@/utils/isAuth";

const navItems = [{
    name: 'Listed Cars',
    path: '/',
  }, {
    name: 'Purchased Cars',
    path: '/purchased-cars'
  },{
    name: 'Logout',
    path: '/logout'
}]

const UserLayout = ({
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

export default isAuth(UserLayout);
