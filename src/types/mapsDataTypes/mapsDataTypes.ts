import { Images, AudioFromApi, MapData } from './mapsDataFromApiTypes';

interface IMapData {
  mapName: string | null;
  audio: string | null;
  images: Images[];
  topPlayers: string[] | [];
  additionalAudio: AudioFromApi[] | [];
  id: string | null;
  mapData: MapData;
  additionalPictures: string[] | [];
}
export default IMapData;
