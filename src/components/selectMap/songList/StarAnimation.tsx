import React from 'react';
import { IStarAnimation } from '../../../types/selectMapPageTypes';

function StarAnimation(props: IStarAnimation) {
  const { songID, clickedSongListItemID } = props;

  return (
    <section className={`star-path ${String(songID) === clickedSongListItemID ? 'star-path-active' : ''}`}>
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
