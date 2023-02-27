import { useSelector } from 'react-redux';
import IReducers from '../types/reducers/reducersType';

const useAuth = () => {
  const {
    name, email, avatar, accuracy, lvl, performance,
  } = useSelector((state: IReducers) => state.userDataReducer);
  return {
    isAuth: !!email,
    name,
    email,
    avatar,
    accuracy,
    lvl,
    performance,
  };
};
export default useAuth;
