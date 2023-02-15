/* eslint-disable default-param-last */
const SET_CURRENT_AUDIO_SOURCE = 'SET_CURRENT_AUDIO_SOURCE';

export const currentAudioSourceReducer = (
  state = '',
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case 'SET_CURRENT_AUDIO_SOURCE':
      return action.payload;
    default:
      return state;
  }
};

export const setCurrentAudioSourceAction = (payload: string) => (
  { type: SET_CURRENT_AUDIO_SOURCE, payload }
);
