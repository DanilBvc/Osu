import { AudioFromApi, Images } from '../../../types/mapsDataTypes/mapsDataFromApiTypes';

const actionType = 'SET_NEW_MAP';
const setNewMap = (payload: {
  mapName: string;
  audio: string;
  images: Images[];
  topPlayers: string[];
  additionalAudio: AudioFromApi[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapData: any;
  id: string;
}) => ({
  type: actionType,
  payload,
});
export default setNewMap;
