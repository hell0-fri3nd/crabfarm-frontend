// src/routes/ProtectedLayout.tsx
import ProtectedRoutes from '../components/layout/protected-routes';
import { Outlet } from 'react-router';
import AppLayout from '~/components/layout/app-layout';
import Bubbles from "~/components/custom/bubbles";
import type { BreadcrumbItem } from '~/types';
import Footer from '~/components/custom/footer';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/page/dashboard',
  },
  {
    title: 'Logs',
    href: '/page/logs',
  },
  {
    title: 'Weigh and Snap',
    href: '/page/weigh-and-snap',
  }
];

export default function PageLayout() {
  return (
    <ProtectedRoutes>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Bubbles />
        <Outlet />
        <Footer />
      </AppLayout>

    </ProtectedRoutes>
  );
}
