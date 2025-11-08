import React from 'react'
import AuthSplitLayout from '~/components/layout/auth-split-layout';
import { 
  Input, 
  Button, 
  Checkbox,
  Label
} from '~/components/ui';



const LoginIndex = () => {
  return (
    <AuthSplitLayout>

      <form className="flex flex-col gap-6 w-full max-w-full">

        <div className="grid gap-6  w-full">

        <div className="grid gap-2 w-full">
          <Input type='email' label="Email" className='w-full' />
          <Input type='password' label="password" className='w-full'/>
        </div>

        <div className="flex items-center justify-between w-full">

          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <Label htmlFor="remember-me">Remember Me</Label>
          </div>

          <Button variant="link" className="text-sm font-medium">
            Forgot password?
          </Button>
        </div>

        <Button className="w-full">Login</Button>
        <Button variant='outline' className='bg-secondary-500 w-full'>Create Account</Button>
                  
        </div>
      </form>

    </AuthSplitLayout>
  )
}

export default LoginIndex