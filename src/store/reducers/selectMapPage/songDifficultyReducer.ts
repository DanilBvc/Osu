/* eslint-disable default-param-last */
const SET_SONG_DIFFICULTY = 'SET_SONG_DIFFICULTY';

export const songDifficultyReducer = (
  state = '',
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case SET_SONG_DIFFICULTY:
      return action.payload;
    default:
      return state;
  }
};

export const setSongDifficultyAction = (payload: string) => (
  { type: SET_SONG_DIFFICULTY, payload }
);
