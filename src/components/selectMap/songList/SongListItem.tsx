import React from 'react';
import { ISongListItem } from '../../../types/selectMapPageTypes';
import songListItemClickHandler from './songListItemClickHandler';
import songListItemHoverHandler from './songListItemHoverHandler';
import songListMousLeaveHandler from './songListMousLeaveHandler';
import StarAnimation from './StarAnimation';

function SongListItem(props: ISongListItem) {
  const {
    songData,
    clickedSongListItemID,
    setClickedSongListItemID,
    setBackgroundSource,
  } = props;

  return (
    <div className="song-list-item-wrapper">
      <StarAnimation songID={songData.ID} clickedSongListItemID={clickedSongListItemID} />
      <li
        className={`song-list-item ${String(songData.ID) === clickedSongListItemID ? 'selected-item' : ''}`}
        role="menuitem"
        data-id={songData.ID}
        onMouseEnter={(event) => {
          songListItemHoverHandler(event);
        }}
        onMouseLeave={(event) => songListMousLeaveHandler(event, clickedSongListItemID)}
        onClick={(event) => {
          setBackgroundSource(songData.background);
          songListItemClickHandler(event, setClickedSongListItemID);
        }}
      >
        <img className="song-list-item__cover" src={songData.background} alt="song cover" />
        <ul className="song-list-item__info-list">
          <li className="info-list-item"><h2>{songData.name}</h2></li>
        </ul>
      </li>
    </div>
  );
}

export default SongListItem;
