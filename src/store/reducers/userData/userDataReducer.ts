/* eslint-disable max-len */
/* eslint-disable default-param-last */
import { userDataState } from '../../../types/userDataTypes/userData';
/* eslint-disable no-param-reassign */
import initialUserData from '../../initialState/UserDataState';

const userDataReducer = (state: userDataState = initialUserData, action: {
  type: string; payload: {
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
  };
}) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state, name: action.payload.name, email: action.payload.email, avatar: action.payload.avatar, accessToken: action.payload.accessToken,
      };
    }
    case 'REMOVE_USER_DATA': {
      state.name = null;
      state.email = null;
      state.avatar = null;
      state.accessToken = null;
      return state;
    }
    default: return state;
  }
};

export default userDataReducer;
