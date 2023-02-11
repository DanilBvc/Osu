import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundSourceAction } from '../../../store/reducers/selectMapPage/backgroundSourceReducer';
import { setCurrentAudioAction } from '../../../store/reducers/selectMapPage/currentAudioReducer';
import { setSongIDAction } from '../../../store/reducers/selectMapPage/songIDReducer';
import IReducers from '../../../types/reducers/reducersType';
import { ISongListItem } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import DifficultRateStars from './DifficultRateStars';
import songListItemClickHandler from './songListItemClickHandler';
import songListItemHoverHandler from './songListItemHoverHandler';
import songListMousLeaveHandler from './songListMousLeaveHandler';
import StarAnimation from './StarAnimation';

function SongListItem(props: ISongListItem) {
  const {
    songData,
    difficulty,
    setClickedSongListData,
  } = props;

  const dispatch = useDispatch();
  const setBackgroundSource = (source: string) => {
    dispatch(setBackgroundSourceAction(source));
  };
  const setSongID = (ID: string) => {
    dispatch(setSongIDAction(ID));
  };
  const currentAudioElement = useSelector((state: IReducers) => state.currentAudioReducer);
  const setCurrentAudio = (audio: HTMLAudioElement) => {
    dispatch(setCurrentAudioAction(audio));
  };
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);

  return (
    <div className="song-list-item-wrapper">
      <StarAnimation songID={songData.id} />
      <li
        className={`song-list-item ${String(songData.id) === selectedSongID ? 'selected-item' : ''}`}
        role="menuitem"
        data-id={songData.id}
        onMouseEnter={(event) => {
          songListItemHoverHandler(event);
        }}
        onMouseLeave={(event) => songListMousLeaveHandler(event, selectedSongID)}
        onClick={(event) => {
          setBackgroundSource(songData.images[0].imagesFile);
          setSongID(songData.id as string);
          currentAudioElement.forEach((auduoElement) => auduoElement.pause());
          setCurrentAudio(new Audio(songData.audio as string));
          currentAudioElement.at(-1)?.play();
          songListItemClickHandler(event);
          setClickedSongListData(songData);
          setClickedSongListData(songData);
        }}
      >
        <img className="song-list-item__cover" src={songData.images[0].imagesFile} alt="song cover" />
        <ul className="song-list-item__info-list">
          <li className="map-name-title"><h2>{`${songData.mapName}`}</h2></li>
          <li className="artist-title">{`${songData.mapData[0].metadata.Artist}`}</li>
          <li className="difficult-title"><h3>Easy</h3></li>
          <li className="difficult-title"><DifficultRateStars difficulty={difficulty} /></li>
        </ul>
      </li>
    </div>
  );
}

export default SongListItem;
