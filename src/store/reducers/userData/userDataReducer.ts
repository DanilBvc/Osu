/* eslint-disable default-param-last */
import { userDataState } from '../../../types/userDataTypes/userData';
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
    maps: number[] | number;
  };
}) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
        accessToken: action.payload.accessToken,
        performance: action.payload.performance,
        accuracy: action.payload.accuracy,
        lvl: action.payload.lvl,
        maps: action.payload.maps,
        uuid: action.payload.uuid,
      };
    }
    case 'REMOVE_USER_DATA': {
      return {
        ...state,
        name: null,
        email: null,
        avatar: null,
        accessToken: null,
        performance: null,
        accuracy: null,
        lvl: null,
        maps: null,
        uuid: null,
      };
    }
    case 'HANDLE_USER_MAPS': {
      if (!Array.isArray(action.payload.maps)) {
        if (state.maps?.includes(action.payload.maps)) {
          state.maps.filter((item) => item !== action.payload.maps);
          return {
            ...state,
            maps: state.maps.filter((item) => item !== action.payload.maps),
          };
        }
        return {
          ...state,
          maps: state.maps !== null ? [...state.maps, action.payload.maps] : [action.payload.maps],
        };
      }
      return state;
    }
    default: return state;
  }
};

export default userDataReducer;
