/* eslint-disable default-param-last */
const SET_CURRENT_AUDIO = 'SET_CURRENT_AUDIO';

export const currentAudioReducer = (
  state = [new Audio('/songs/682290.mp3')],
  action: {
    type: string;
    payload: HTMLAudioElement;
  }
) => {
  switch (action.type) {
    case 'SET_CURRENT_AUDIO':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const setCurrentAudioAction = (payload: HTMLAudioElement) => (
  { type: SET_CURRENT_AUDIO, payload }
);
