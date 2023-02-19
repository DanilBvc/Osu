/* eslint-disable default-param-last */
const SET_DIFFICULTY_SONG_INDEX = 'SET_DIFFICULTY_SONG_INDEX';

export const difficultySongIndexReducer = (
  state = 0,
  action: {
    type: string;
    payload: number;
  }
) => {
  switch (action.type) {
    case SET_DIFFICULTY_SONG_INDEX:
      return action.payload;
    default:
      return state;
  }
};

export const setDifficultySongIndexAction = (payload: number) => (
  { type: SET_DIFFICULTY_SONG_INDEX, payload }
);
