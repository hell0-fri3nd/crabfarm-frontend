// src/routes/ProtectedLayout.tsx
import ProtectedRoutes from '../components/layout/protected-routes';
import { Outlet } from 'react-router';
import AppLayout from '~/components/layout/app-layout';
import Bubbles from "~/components/custom/bubbles";
import type { BreadcrumbItem } from '~/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  }
];

export default function PageLayout() {
  return (
    <ProtectedRoutes>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Bubbles />
        <Outlet />
      </AppLayout>
    </ProtectedRoutes>
  );
}
