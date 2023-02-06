interface IMapData {
  mapName: string | null;
  audio: string | null;
  albumCover: string;
  topPlayers: string[] | [];
  additionalAudio: string[] | [];
  additionalPictures: string[] | [];
  id: string;
}
export default IMapData;
