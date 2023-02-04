/* eslint-disable max-len */
/* eslint-disable default-param-last */
import IMapData from '../../../types/mapsDataTypes/mapsDataTypes';
import { userDataState } from '../../../types/userDataTypes/userData';
import mapsDataState from '../../initialState/MapsDataState';

const mapsDataReducer = (state: IMapData[] = mapsDataState, action: {
  type: string; payload: {
    mapName: string;
    audio: string;
    albumCover: string[];
    topPlayers: string[];
    additionalAudio: string[];
    additionalPictures: string[];
  };
}) => {
  switch (action.type) {
    case 'SET_NEW_MAP': {
      const { payload } = action;
      return [...state, {
        mapName: payload.mapName, audio: payload.audio, albumCover: payload.albumCover, topPlayers: payload.topPlayers, additionalAudio: payload.additionalAudio, additionalPictures: payload.additionalPictures,
      }];
    }
    default: return state;
  }
};

export default mapsDataReducer;
