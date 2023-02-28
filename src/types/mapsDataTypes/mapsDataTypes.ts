import {
  Images, AudioFromApi, MapData, topPlayerItem
} from './mapsDataFromApiTypes';

interface IMapData {
  mapName: string | null;
  audio: string | null;
  images: Images[];
  topPlayers: { [key: string]: [] | topPlayerItem[] }[] | [];
  additionalAudio: AudioFromApi[] | [];
  id: string | null;
  mapData: MapData[];
  additionalPictures: string[] | [];
}
export default IMapData;
