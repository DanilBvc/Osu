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
  clickedSongListItemID: string;
  setClickedSongListItemID: React.Dispatch<React.SetStateAction<string>>;
  setClickedSongListData: React.Dispatch<React.SetStateAction<IMapData>>;
  setBackgroundSource: React.Dispatch<React.SetStateAction<string>>;
  currentPageAudio: HTMLAudioElement;
  setCurrentPageAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement>>;
}
export interface IStarAnimation {
  songID: string | null;
  clickedSongListItemID: string;
}
export interface IPlayersStatisticList {
  clickedSongListData: IMapData;
}
export interface IOsuButton {
  path: string;
  currentPageAudio: HTMLAudioElement;
}
export interface IParallaxBacground {
  backgroundSource: string;
}
