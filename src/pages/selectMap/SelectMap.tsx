/* eslint-disable import/order */
import React, { useRef, useEffect, useState } from 'react';
import parallaxCreate from '../../utils/parallaxCreate';
import './SelectMapPageStyles.scss';
import throttle from '../../utils/throttle';
import songsData from './songsData';
import SongListItem from '../../components/selectMap/songList/SongListItem';
import { useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';

function SelectMap() {
  const throttleInProgress = useRef(false);
  const [clickedSongListItemID, setClickedSongListItemID] = useState('1011011');
  const [backgroundSource, setBackgroundSource] = useState(songsData[1011011].background);
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  console.log(mapsData);

  useEffect(() => {
    const background = document.querySelector('.select-map-page-container__background') as HTMLDivElement;

    document.addEventListener('mousemove', (event) => {
      throttle(() => parallaxCreate(event, background), throttleInProgress, 25);
    });
  }, []);

  return (
    <div className="select-map-page-container">
      <div
        className="select-map-page-container__background"
        style={{
          backgroundImage: `url(${backgroundSource})`,
        }}
      />
      <ul className="select-map-page-container__songs-list">
        { Object.values(songsData).map((songData) => (
          <SongListItem
            songData={songData}
            clickedSongListItemID={clickedSongListItemID}
            setClickedSongListItemID={setClickedSongListItemID}
            setBackgroundSource={setBackgroundSource}
            key={window.crypto.randomUUID()}
          />
        )) }
      </ul>
    </div>
  );
}

export default SelectMap;
