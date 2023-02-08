import { Images, AudioFromApi } from './mapsDataFromApiTypes';

interface IMapData {
  mapName: string | null;
  audio: string | null;
  images: Images[];
  topPlayers: string[] | [];
  additionalAudio: AudioFromApi[] | [];
  id: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapData: any;
  additionalPictures: string[] | [];
}
export default IMapData;
