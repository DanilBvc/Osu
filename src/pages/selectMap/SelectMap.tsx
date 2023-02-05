/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import React, { useRef, useEffect, useState } from 'react';
import parallaxCreate from '../../utils/parallaxCreate';
import './SelectMapPageStyles.scss';
import throttle from '../../utils/throttle';
import songsData from './songsData';
import SongListItem from '../../components/selectMap/songList/SongListItem';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import useUnSub from '../../customHooks/useUnSub';
import PlayersStatisticList from '../../components/selectMap/playersStatisticList/PlayersStatisticList';

function SelectMap() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  const stateUsers = useSelector((state: IReducers) => state.userDataReducer);
  const throttleInProgress = useRef(false);
  const [clickedSongListItemID, setClickedSongListItemID] = useState('dead batteries');
  const [clickedSongListData, setClickedSongListData] = useState(mapsData[0]);
  // TODO: change to right bg image
  const [backgroundSource, setBackgroundSource] = useState(songsData[1011011].background);
  const dispatch = useDispatch();
  const currentPageAudio = new Audio();

  useUnSub();
  useEffect(() => {
    const background = document.querySelector('.select-map-page-container__background') as HTMLDivElement;
    const getMapsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));

      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        dispatch(setNewMap({
          mapName: mapsData.mapName,
          audio: mapsData.audio,
          albumCover: mapsData.albumCover,
          topPlayers: mapsData.topPlayers,
          additionalAudio: mapsData.additionalAudio,
          additionalPictures: mapsData.additionalPictures,
          id: mapsData.id,
        }));
      });
    };

    document.addEventListener('mousemove', (event) => {
      throttle(() => parallaxCreate(event, background), throttleInProgress, 25);
    });
    getMapsData();
  }, []);

  return (
    <div className="select-map-page-container">
      <div
        className="select-map-page-container__background"
        style={{
          backgroundImage: `url(${backgroundSource})`,
        }}
      />
      <PlayersStatisticList clickedSongListData={clickedSongListData} />
      <ul className="select-map-page-container__songs-list">
        {Object.values(mapsData).map((songData) => (
          <SongListItem
            songData={songData}
            clickedSongListItemID={clickedSongListItemID}
            setClickedSongListItemID={setClickedSongListItemID}
            setClickedSongListData={setClickedSongListData}
            setBackgroundSource={setBackgroundSource}
            currentPageAudio={currentPageAudio}
            key={window.crypto.randomUUID()}
          />
        ))}
      </ul>
    </div>
  );
}

export default SelectMap;
