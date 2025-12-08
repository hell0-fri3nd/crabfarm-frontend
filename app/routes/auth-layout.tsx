import React from 'react'
import type { Route } from '../+types/';
import AuthSimpleLayout from '~/components/layout/auth/auth-simple-layout'
import { Outlet } from 'react-router';
import ProtectedRoutes , { DefaultRoutes } from '~/components/layout/protected-routes';
import Footer from '~/components/custom/footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CrabFarm" },
    { name: "description", content: "Aquaculture Management System" },
  ]
}


const AuthLayout = () => {
  return (
    <DefaultRoutes>
      <AuthSimpleLayout title='CrabFarm' description='Aquaculture Management System'>
        <Outlet />
      </AuthSimpleLayout>
      <Footer />
    </DefaultRoutes>
  )
}

export default AuthLayout