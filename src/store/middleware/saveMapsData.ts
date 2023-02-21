import { Dispatch } from 'redux';
import { userDataState } from '../../types/userDataTypes/userData';
import IMapData from '../../types/mapsDataTypes/mapsDataTypes';

const saveMapsData = (store: IMapData[]) => (next: Dispatch) => (action: {
  type: string; payload: {
    mapName: string;
    audio: string;
    albumCover: string[];
    topPlayers: string[];
    additionalAudio: string[];
    additionalPictures: string[];

  };
}) => {
  // тут сохранять данные пользователя при перезагрузке
  const result = next(action);
  return result;
};
export default saveMapsData;
