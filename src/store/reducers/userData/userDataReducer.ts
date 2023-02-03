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
    performance: number;
    accuracy: number;
    lvl: number;
    uuid: string;
  };
}) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state, name: action.payload.name, email: action.payload.email, avatar: action.payload.avatar, accessToken: action.payload.accessToken, performance: action.payload.performance, accuracy: action.payload.accuracy, lvl: action.payload.lvl,
      };
    }
    case 'REMOVE_USER_DATA': {
      state.name = null;
      state.email = null;
      state.avatar = null;
      state.accessToken = null;
      state.accuracy = null;
      state.lvl = null;
      state.performance = null;
      return state;
    }
    default: return state;
  }
};

export default userDataReducer;
