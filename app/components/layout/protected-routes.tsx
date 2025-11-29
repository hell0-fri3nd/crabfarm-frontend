import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import type { RootState } from '../../store/store';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, status,error } = useSelector((state: RootState) => state.auth);
  // const location = useLocation()

  // console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated);
  // console.log("user:", user);
  // console.log("status:", status);
  // console.log("error:", error);


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/auth/" 
        replace
      />
    );
  }

  return children;
}

export const DefaultRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, status,error } = useSelector((state: RootState) => state.auth);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <Navigate 
        to="/page/" 
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoutes