/* eslint-disable default-param-last */
const SET_AUTH_POPUP_ACTIVE = 'SET_AUTH_POPUP_ACTIVE';

export const authPopupActiveReducer = (
  state = false,
  action: {
    type: string;
    payload: boolean;
  }
) => {
  switch (action.type) {
    case SET_AUTH_POPUP_ACTIVE:
      return action.payload;
    default:
      return state;
  }
};

export const setAuthPopupActiveAction = (payload: boolean) => (
  { type: SET_AUTH_POPUP_ACTIVE, payload }
);
