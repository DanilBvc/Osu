/* eslint-disable default-param-last */

const SET_BACKGROUND_SOURCE = 'SET_BACKGROUND_SOURCE';

export const backgroundSourceReducer = (
  state = '/songs/1011011.jpg',
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case SET_BACKGROUND_SOURCE:
      return action.payload;
    default:
      return state;
  }
};

export const setBackgroundSourceAction = (payload: string) => (
  { type: SET_BACKGROUND_SOURCE, payload }
);
