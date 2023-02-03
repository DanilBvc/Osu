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
  // тут сохранять данные пользователя при перезагрузке
  const result = next(action);
  return result;
};
export default saveUserData;
