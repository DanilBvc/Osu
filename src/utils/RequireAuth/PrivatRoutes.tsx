import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import IReducers from '../../types/reducers/reducersType';

export default function PrivateRoutes(): JSX.Element {
  const isAuth = useSelector((state: IReducers): boolean => !!state.userDataReducer.email);
  const location = useLocation();
  const isAuthFromLocalStorage = localStorage.getItem('IsAuth');
  return (
    isAuthFromLocalStorage && isAuthFromLocalStorage === 'true' ? <Outlet /> : <Navigate to="/" state={{ from: location }} />
  );
}
