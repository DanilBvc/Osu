import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundSourceAction } from '../../../store/reducers/selectMapPage/backgroundSourceReducer';
import { setCurrentAudioSourceAction } from '../../../store/reducers/selectMapPage/currentAudioSourceReducer';
import { setSongDifficultyAction } from '../../../store/reducers/selectMapPage/songDifficultyReducer';
import { setSongIDAction } from '../../../store/reducers/selectMapPage/songIDReducer';
import IReducers from '../../../types/reducers/reducersType';
import { ISongListItem } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import DifficultRateStars from './DifficultRateStars';
import songListItemClickHandler from './songListItemClickHandler';
import songListItemHoverHandler from './songListItemHoverHandler';
import songListMousLeaveHandler from './songListMousLeaveHandler';
import StarAnimation from './StarAnimation';
import './songListItemStyles.scss';

function SongListItem(props: ISongListItem) {
  const {
    songData,
    difficulty,
  } = props;
  const dispatch = useDispatch();
  const setBackgroundSource = (source: string) => {
    dispatch(setBackgroundSourceAction(source));
  };
  const setSongID = (ID: string) => {
    dispatch(setSongIDAction(ID));
  };
  const setSongDifficulty = (songDifficulty: string) => {
    dispatch(setSongDifficultyAction(songDifficulty));
  };
  const setCurrentAudioSource = (audioSource: string) => {
    dispatch(setCurrentAudioSourceAction(audioSource));
  };
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const selectedSongDifficulty = useSelector((state: IReducers) => state.songDifficultyReducer);

  return (
    <div className="song-list-item-wrapper">
      <StarAnimation songID={songData.id} difficulty={difficulty} />
      <li
        className={`song-list-item ${
          difficulty === 'Easy'
            ? 'easy-map'
            : 'hard-map'
        } ${
          String(songData.id) === selectedSongID && difficulty === selectedSongDifficulty
            ? 'selected-item'
            : ''
        }`}
        role="menuitem"
        data-id={songData.id}
        data-difficulty={difficulty}
        onMouseEnter={(event) => songListItemHoverHandler(event)}
        onMouseLeave={(event) => (
          songListMousLeaveHandler(event, selectedSongID, selectedSongDifficulty)
        )}
        onClick={(event) => {
          setBackgroundSource(songData.images[0].imagesFile);
          setSongID(songData.id as string);
          setCurrentAudioSource(songData.audio as string);
          setSongDifficulty(difficulty);
          songListItemClickHandler(event);
        }}
      >
        <img className="song-list-item__cover" src={songData.images[0].imagesFile} alt="song cover" />
        <ul className="song-list-item__info-list">
          <li className="map-name-title"><h2>{`${songData.mapName}`}</h2></li>
          <li className="artist-title">{`${songData.mapData[0].metadata.Artist}`}</li>
          <li className="difficult-title"><h3>{difficulty}</h3></li>
          <li className="difficult-title"><DifficultRateStars difficulty={difficulty} /></li>
        </ul>
      </li>
    </div>
  );
}

export default SongListItem;
