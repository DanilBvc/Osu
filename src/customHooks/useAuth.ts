import { useSelector } from 'react-redux';
import { userDataState } from '../types/userDataTypes/userData';

const useAuth = () => {
  const { name, email, avatar } = useSelector((state: userDataState) => state);
  return {
    isAuth: !!email,
    name,
    email,
    avatar,
  };
};
export default useAuth;
