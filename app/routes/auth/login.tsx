import React from 'react'
import AuthSplitLayout from '~/components/layout/auth/auth-split-layout';
import AuthSimpleLayout from '~/components/layout/auth/auth-simple-layout';
import { 
  Input, 
  Button, 
  Checkbox,
  Label
} from '~/components/ui';
import type { Route } from '../+types/';
import type { RootState, AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/store/auth/auth-slice';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CrabFarm" },
    { name: "description", content: "Aquaculture Management System" },
  ]
}


const LoginIndex = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch<AppDispatch>(); // typed dispatch
  const auth = useSelector((state: RootState) => state.auth); // typed selector

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); 
      await dispatch(login({ email: user.email, password: user.password, remember_me: false })).unwrap();

      console.log('Login succeeded!', auth);

    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthSimpleLayout title='CrabFarm' description='Aquaculture Management System'>

      <form className="flex flex-col gap-6 w-full max-w-full" onSubmit={handleLogin}>

        <div className="grid gap-6  w-full">

        <div className="grid gap-2 w-full">
          <Label htmlFor='email'>Email</Label>
          <Input 
          type='email' 
          id='email' 
          className='w-full h-12 text-base px-4' 
          placeholder='Enter your email' 
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required/>
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor='password'>Password</Label>
          <Input 
          type='password' 
          id='password' 
          className='w-full h-12 text-base px-4' 
          placeholder='Enter your password' 
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required/>
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

        <Button 
        className="w-full"    
        type='submit'   
        >Login</Button>

        {/* <Button variant='outline' className='bg-secondary-500 w-full'>Create Account</Button> */}
                  
        </div>
      </form>

    </AuthSimpleLayout>
  )
}

export default LoginIndex