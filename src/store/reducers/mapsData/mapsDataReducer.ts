/* eslint-disable max-len */
/* eslint-disable default-param-last */
import { AudioFromApi, Images, MapData } from '../../../types/mapsDataTypes/mapsDataFromApiTypes';
import IMapData from '../../../types/mapsDataTypes/mapsDataTypes';
import { userDataState } from '../../../types/userDataTypes/userData';
import mapsDataState from '../../initialState/MapsDataState';

const mapsDataReducer = (state: IMapData[] = mapsDataState, action: {
  type: string; payload: {
    mapName: string;
    audio: string;
    images: Images[];
    topPlayers: string[];
    additionalAudio: AudioFromApi[];
    mapData: MapData;
    id: string;
  };
}) => {
  switch (action.type) {
    case 'SET_NEW_MAP': {
      const { payload } = action;
      return [...state, {
        mapName: payload.mapName,
        audio: payload.audio,
        images: payload.images,
        topPlayers: payload.topPlayers,
        additionalAudio: payload.additionalAudio,
        id: payload.id,
        mapData: payload.mapData,
      }];
    }
    default: return state;
  }
};

export default mapsDataReducer;
