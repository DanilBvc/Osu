import React from 'react';
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
  setClickedSongListData: React.Dispatch<React.SetStateAction<IMapData>>;
}
export interface IStarAnimation {
  songID: string | null;
}
export interface IPlayersStatisticList {
  clickedSongListData: IMapData;
}
export interface IOsuButton {
  path: string;
}
export interface IDifficultRateStars {
  difficulty: string;
}
