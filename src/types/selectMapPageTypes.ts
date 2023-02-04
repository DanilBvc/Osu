import React from 'react';

export interface ISongData {
  name: string;
  background: string;
  audio: string;
  ID: number;
}
export interface ISongListItem {
  songData: ISongData;
  clickedSongListItemID: string;
  setClickedSongListItemID: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundSource: React.Dispatch<React.SetStateAction<string>>;
}
export interface IStarAnimation {
  songID: number;
  clickedSongListItemID: string;
}
