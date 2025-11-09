import React from 'react'
import AuthSplitLayout from '~/components/layout/auth-split-layout';
import AuthSimpleLayout from '~/components/layout/auth-simple-layout';
import { 
  Input, 
  Button, 
  Checkbox,
  Label
} from '~/components/ui';
import type { Route } from '../+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CrabFarm" },
    { name: "description", content: "Aquaculture Management System" },
  ]
}


const LoginIndex = () => {
  return (
    <AuthSimpleLayout title='CrabFarm' description='Aquaculture Management System'>

      <form className="flex flex-col gap-6 w-full max-w-full">

        <div className="grid gap-6  w-full">

        <div className="grid gap-2 w-full">
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' className='w-full h-12 text-base px-4' placeholder='Enter your email' required/>
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor='password'>Password</Label>
          <Input type='password' id='password' className='w-full h-12 text-base px-4' placeholder='Enter your password' required/>
        </div>

        <div className="flex items-center justify-between w-full">

          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <Label htmlFor="remember-me">Remember Me for 30 days</Label>
          </div>

          <Button variant="link" className="text-sm font-medium">
            Forgot password?
          </Button>
        </div>

        <Button className="w-full">Login</Button>
        {/* <Button variant='outline' className='bg-secondary-500 w-full'>Create Account</Button> */}
                  
        </div>
      </form>

    </AuthSimpleLayout>
  )
}

export default LoginIndex