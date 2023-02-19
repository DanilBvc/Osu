import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import { IStarAnimation } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './starAnimationStyles.scss';

function StarAnimation(props: IStarAnimation) {
  const {
    songID,
    songDifficultyIndex,
  } = props;
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const selectedSongDifficultyIndex = useSelector(
    (state: IReducers) => state.songDifficultyIndexReducer
  );

  return (
    <section className={`star-path ${
      String(songID) === selectedSongID && songDifficultyIndex === selectedSongDifficultyIndex
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
