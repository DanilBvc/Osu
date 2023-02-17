/* eslint-disable default-param-last */
import IMapData from '../../../types/mapsDataTypes/mapsDataTypes';

enum GAMEACTIONS {
  SET_ACTIVE_GAME = 'SET_ACTIVE_GAME'
}

interface GameAction {
  type: string;
  payload: IMapData;
}

const initialState: IMapData = {
  mapName: '',
  audio: '',
  images: [],
  additionalPictures: [],
  topPlayers: [],
  additionalAudio: [],
  mapData: [],
  id: '',
};

const activeGameReduccer = (state: IMapData = initialState, action: GameAction): IMapData => {
  switch (action.type) {
    case GAMEACTIONS.SET_ACTIVE_GAME: {
      return { ...action.payload };
    }
    default: return state;
  }
};

export const setActiveGameAction = (payload: IMapData) => (
  { type: GAMEACTIONS.SET_ACTIVE_GAME, payload }
);

export default activeGameReduccer;
