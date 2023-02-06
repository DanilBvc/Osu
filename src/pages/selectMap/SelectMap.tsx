/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import './SelectMapPageStyles.scss';
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
import SelectMapPageFooter from '../../components/selectMap/footer/SelectMapPageFooter';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import ParallaxBacground from '../../components/selectMap/parallaxBacground/ParallaxBacground';

function SelectMap() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  // TODO: delete stateUsers if it wont be used
  const stateUsers = useSelector((state: IReducers) => state.userDataReducer);
  const [clickedSongListItemID, setClickedSongListItemID] = useState('1119f01d-988f-0dfe-2f97-5c63b5da2aad');
  const [clickedSongListData, setClickedSongListData] = useState(mapsData[0]);
  // TODO: change to right bg image
  const [backgroundSource, setBackgroundSource] = useState(songsData[1011011].background);
  const dispatch = useDispatch();
  // const [currentPageAudio, setCurrentPageAudio] = useState(new Audio());
  // TODO: change to right audio
  const [currentPageAudio, setCurrentPageAudio] = useState(new Audio('/songs/682290.mp3'));

  useEffect(() => {
    currentPageAudio.play();
  }, []);

  useUnSub();
  useEffect(() => {
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

    getMapsData();
  }, []);

  return (
    <div className="select-map-page-container">
      <ParallaxBacground backgroundSource={backgroundSource} />
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
            setCurrentPageAudio={setCurrentPageAudio}
            key={window.crypto.randomUUID()}
          />
        ))}
      </ul>
      <SelectMapPageFooter />
      <OsuButton path="/game" currentPageAudio={currentPageAudio} />
    </div>
  );
}

export default SelectMap;
