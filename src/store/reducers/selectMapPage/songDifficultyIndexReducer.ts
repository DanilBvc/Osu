/* eslint-disable default-param-last */
const SET_SONG_DIFFICULTY_INDEX = 'SET_DIFFICULTY_SONG_INDEX';

export const songDifficultyIndexReducer = (
  state = 0,
  action: {
    type: string;
    payload: number;
  }
) => {
  switch (action.type) {
    case SET_SONG_DIFFICULTY_INDEX:
      return action.payload;
    default:
      return state;
  }
};

export const setSongDifficultyIndexAction = (payload: number) => (
  { type: SET_SONG_DIFFICULTY_INDEX, payload }
);
