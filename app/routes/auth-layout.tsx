import React from 'react'
import type { Route } from '../+types/';
import AuthSimpleLayout from '~/components/layout/auth/auth-simple-layout'
import { Outlet } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CrabFarm" },
    { name: "description", content: "Aquaculture Management System" },
  ]
}


const AuthLayout = () => {
  return (
    <AuthSimpleLayout title='CrabFarm' description='Aquaculture Management System'>
        <Outlet />
    </AuthSimpleLayout>
  )
}

export default AuthLayout