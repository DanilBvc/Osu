import { AudioFromApi, Images, MapData } from '../../../types/mapsDataTypes/mapsDataFromApiTypes';

const actionType = 'SET_NEW_MAP';
const setNewMap = (payload: {
  mapName: string;
  audio: string;
  images: Images[];
  topPlayers: string[];
  additionalAudio: AudioFromApi[];
  mapData: MapData[];
  id: string;
}) => ({
  type: actionType,
  payload,
});
export default setNewMap;
