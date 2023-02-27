/* eslint-disable default-param-last */
const SET_AUTH_LOADING = 'SET_AUTH_LOADING';

export const authLoadingReducer = (
  state = false,
  action: {
    type: string;
    payload: boolean;
  }
) => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export const setAuthLoadingAction = (payload: boolean) => (
  { type: SET_AUTH_LOADING, payload }
);
