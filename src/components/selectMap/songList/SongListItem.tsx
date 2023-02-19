/* eslint-disable @typescript-eslint/indent */
import { useDispatch, useSelector } from 'react-redux';
import { setActiveGameAction } from '../../../store/reducers/game/selectGameReducer';
import { setBackgroundSourceAction } from '../../../store/reducers/selectMapPage/backgroundSourceReducer';
import { setCurrentAudioSourceAction } from '../../../store/reducers/selectMapPage/currentAudioSourceReducer';
import { setSongIDAction } from '../../../store/reducers/selectMapPage/songIDReducer';
import IReducers from '../../../types/reducers/reducersType';
import { ISongListItem } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import DifficultRateStars from './DifficultRateStars';
import songListItemClickHandler from './songListItemClickHandler';
import songListItemHoverHandler from './songListItemHoverHandler';
import songListMousLeaveHandler from './songListMousLeaveHandler';
import StarAnimation from './StarAnimation';
import './songListItemStyles.scss';
import { setSongDifficultyIndexAction } from '../../../store/reducers/selectMapPage/songDifficultyIndexReducer';

function SongListItem(props: ISongListItem) {
  const {
    songData,
    songDifficultyIndex,
  } = props;
  const dispatch = useDispatch();
  const setBackgroundSource = (source: string) => {
    dispatch(setBackgroundSourceAction(source));
  };
  const setSongID = (ID: string) => {
    dispatch(setSongIDAction(ID));
  };
  const setSongDifficultyIndex = (mapDataElementIndex: number) => {
    dispatch(setSongDifficultyIndexAction(mapDataElementIndex));
  };
  const setCurrentAudioSource = (audioSource: string) => {
    dispatch(setCurrentAudioSourceAction(audioSource));
  };
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const selectedDifficultySongIndex = useSelector(
    (state: IReducers) => state.songDifficultyIndexReducer
  );

  return (
    <div className="song-list-item-wrapper">
      <StarAnimation
        songID={songData.id}
        songDifficultyIndex={songDifficultyIndex}
      />
      <li
        className={`song-list-item ${selectedSongID === String(songData.id)
          ? 'selected-difficulty-map-group'
          : ''
          } ${selectedSongID === String(songData.id) && songDifficultyIndex === selectedDifficultySongIndex
            ? 'selected-item'
            : ''
          }`}
        role="menuitem"
        data-id={songData.id}
        data-difficulty-index={songDifficultyIndex}
        onMouseEnter={(event) => songListItemHoverHandler(event)}
        onMouseLeave={(event) => (
          songListMousLeaveHandler(event, selectedSongID, selectedDifficultySongIndex)
        )}
        onClick={(event) => {
          setBackgroundSource(songData.images[0].imagesFile);
          setSongID(songData.id as string);
          setCurrentAudioSource(songData.audio as string);
          setSongDifficultyIndex(songDifficultyIndex);
          songListItemClickHandler(event);
          dispatch(setActiveGameAction(songData));
        }}
      >
        <img className="song-list-item__cover" src={songData.images[0].imagesFile} alt="song cover" />
        <ul className="song-list-item__info-list">
          <li className="map-name-title">
            <h2>{`${songData.mapName}`}</h2>
          </li>
          <li className="artist-title">{`${songData.mapData[0].metadata.Artist}`}</li>
          <li className="difficult-title">
            <h3>{songData.mapData[songDifficultyIndex].metadata.Version}</h3>
          </li>
          <li className="difficult-title">
            <DifficultRateStars
              overallDifficultyRate={
                songData.mapData[songDifficultyIndex].difficulty.OverallDifficulty
              }
            />
          </li>
        </ul>
      </li>
    </div>
  );
}

export default SongListItem;
