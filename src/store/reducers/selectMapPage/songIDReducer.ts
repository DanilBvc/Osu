/* eslint-disable default-param-last */
const SET_SONG_ID = 'SET_SONG_ID';

export const songIDReducer = (
  state = '',
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case SET_SONG_ID:
      return action.payload;
    default:
      return state;
  }
};

export const setSongIDAction = (payload: string) => (
  { type: SET_SONG_ID, payload }
);
