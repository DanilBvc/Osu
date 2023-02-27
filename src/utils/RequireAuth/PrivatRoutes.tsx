import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoutes(): JSX.Element {
  const location = useLocation();
  const isAuthFromLocalStorage = localStorage.getItem('IsAuth');
  return (
    isAuthFromLocalStorage && isAuthFromLocalStorage === 'true' ? <Outlet /> : <Navigate to="/" state={{ from: location }} />
  );
}
