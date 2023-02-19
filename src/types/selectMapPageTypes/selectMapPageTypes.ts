import IMapData from '../mapsDataTypes/mapsDataTypes';

export interface ISongData {
  mapName: string;
  audio: string;
  albumCover: string;
  topPlayers: string[];
  additionalAudio: string[];
  additionalPictures: string[];
}
export interface ISongListItem {
  songData: IMapData;
  difficulty: string;
  songDifficultyIndex: number;
}
export interface IStarAnimation {
  songID: string | null;
  songDifficultyIndex: number;
}
export interface IDifficultRateStars {
  difficulty: string;
}
