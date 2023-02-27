import {
  AudioFromApi, Images, MapData, topPlayerItem
} from '../../../types/mapsDataTypes/mapsDataFromApiTypes';

const actionType = 'SET_NEW_MAP';
const setNewMap = (payload: {
  mapName: string;
  audio: string;
  images: Images[];
  additionalAudio: AudioFromApi[];
  mapData: MapData[];
  id: string;
  topPlayers: { [key: string]: [] | topPlayerItem[] }[] | [];
}) => ({
  type: actionType,
  payload,
});
export default setNewMap;
