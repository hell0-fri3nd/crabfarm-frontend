
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import type { RootState } from '~/store/store';

const DefaultRouting = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const from = location.state?.from?.pathname || "/page/";
  return <Navigate to={from} replace />;
}

export default DefaultRouting