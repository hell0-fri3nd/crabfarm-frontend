import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import type { RootState } from '../../store/store';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, status } = useSelector((state: RootState) => state.auth);
  const location = useLocation()

  console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated, "user:", user, "status:", status);
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

export default ProtectedRoutes