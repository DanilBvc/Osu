/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import './SelectMapPageStyles.scss';
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
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';

function SelectMap() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  // TODO: delete stateUsers if it wont be used
  const stateUsers = useSelector((state: IReducers) => state.userDataReducer);
  const [clickedSongListData, setClickedSongListData] = useState(mapsData[0]);
  // TODO: change to right bg image
  const dispatch = useDispatch();

  // TODO: play starting audio
  useEffect(() => {
    // currentPageAudio.play();
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
      <ParallaxBackground />
      <PlayersStatisticList clickedSongListData={clickedSongListData} />
      <ul className="select-map-page-container__songs-list">
        {Object.values(mapsData).map((songData) => (
          <SongListItem
            songData={songData}
            setClickedSongListData={setClickedSongListData}
            key={window.crypto.randomUUID()}
          />
        ))}
      </ul>
      <SelectMapPageFooter />
      <OsuButton path="/game" />
    </div>
  );
}

export default SelectMap;
