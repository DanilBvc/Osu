import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongDifficultyAction } from '../../../store/reducers/selectMapPage/songDifficultyReducer';
import IReducers from '../../../types/reducers/reducersType';
import { IStarAnimation } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './starAnimationStyles.scss';

function StarAnimation(props: IStarAnimation) {
  const {
    songID,
    difficulty,
  } = props;
  const dispatch = useDispatch();
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const selectedSongDifficulty = useSelector((state: IReducers) => state.songDifficultyReducer);

  return (
    <section className={`star-path ${
      String(songID) === selectedSongID && difficulty === selectedSongDifficulty
        ? 'star-path-active'
        : ''}`}
    >
      <span className="star-path__star-item" />
      <span className="star-path__star-item" />
      <span className="star-path__star-item" />
      <span className="star-path__star-item" />
      <span className="star-path__star-item" />
      <span className="star-path__star-item" />
    </section>
  );
}

export default StarAnimation;
