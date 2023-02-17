import { Dispatch } from 'redux';
import { userDataState } from '../../types/userDataTypes/userData';

const saveUserData = (store: userDataState) => (next: Dispatch) => (action: {
  type: string; payload: {
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
    performance: number;
    accuracy: number;
    lvl: number;
    uuid: string;
  };
}) => {
  if (action.payload && action.type === 'SET_USER_DATA' && action.payload.name) {
    localStorage.setItem('IsAuth', 'true');
  }
  if (action.type === 'REMOVE_USER_DATA') {
    localStorage.setItem('IsAuth', 'false');
  }
  const result = next(action);
  return result;
};
export default saveUserData;
