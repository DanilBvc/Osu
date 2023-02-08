import React from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import { IStarAnimation } from '../../../types/selectMapPageTypes/selectMapPageTypes';

function StarAnimation(props: IStarAnimation) {
  const { songID } = props;
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);

  return (
    <section className={`star-path ${String(songID) === selectedSongID ? 'star-path-active' : ''}`}>
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
