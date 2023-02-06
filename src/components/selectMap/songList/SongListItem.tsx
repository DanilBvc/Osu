import React from 'react';
import { ISongListItem } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import songListItemClickHandler from './songListItemClickHandler';
import songListItemHoverHandler from './songListItemHoverHandler';
import songListMousLeaveHandler from './songListMousLeaveHandler';
import StarAnimation from './StarAnimation';

function SongListItem(props: ISongListItem) {
  const {
    songData,
    clickedSongListItemID,
    setClickedSongListItemID,
    setClickedSongListData,
    setBackgroundSource,
    currentPageAudio,
  } = props;

  return (
    <div className="song-list-item-wrapper">
      <StarAnimation songID={songData.id} clickedSongListItemID={clickedSongListItemID} />
      <li
        className={`song-list-item ${String(songData.id) === clickedSongListItemID ? 'selected-item' : ''}`}
        role="menuitem"
        data-id={songData.id}
        onMouseEnter={(event) => {
          songListItemHoverHandler(event);
        }}
        onMouseLeave={(event) => songListMousLeaveHandler(event, clickedSongListItemID)}
        onClick={(event) => {
          setBackgroundSource(songData.albumCover);
          songListItemClickHandler(event, setClickedSongListItemID);
          setClickedSongListData(songData);
          currentPageAudio.src = songData.audio as string;
          currentPageAudio.play();
        }}
      >
        <img className="song-list-item__cover" src={songData.albumCover} alt="song cover" />
        <ul className="song-list-item__info-list">
          <li className="info-list-item"><h2>{songData.mapName}</h2></li>
        </ul>
      </li>
    </div>
  );
}

export default SongListItem;
