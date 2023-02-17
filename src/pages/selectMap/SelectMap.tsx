/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import './SelectMapPageStyles.scss';
import SongListItem from '../../components/selectMap/songList/SongListItem';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import {
  collection, doc, getDoc, getDocs
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MapDataFromApi } from '../../types/mapsDataTypes/mapsDataFromApiTypes';
import PlayersStatisticList from '../../components/selectMap/playersStatisticList/PlayersStatisticList';
import SelectMapPageFooter from '../../components/selectMap/footer/SelectMapPageFooter';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import setUserData from '../../store/actionCreators/userData/setUserData';

function SelectMap() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  // TODO: change to right bg image
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: IReducers) => state.userDataReducer);
  // TODO: set to play starting audio
  // useEffect(() => {
  //   currentPageAudio.play();
  // }, []);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (user.email !== null
            && user.displayName !== null
            && user.photoURL !== null) {
            dispatch(setUserData({
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              accessToken: 'user.accessToken',
              performance: userData.performance,
              accuracy: userData.accuracy,
              lvl: userData.lvl,
              uuid: user.uid,
              maps: userData.maps,
            }));
            setIsAuth(true);
          }
        }
      }
    });
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    const getMapsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        if (state.maps?.includes(+mapsData.id)) {
          const resultData: MapDataFromApi = {
            id: '',
            mapName: '',
            audio: '',
            additionAudio: [],
            images: [],
            mapData: [],
          };
          Object.entries(mapsData).forEach((data) => {
            const format = data[0].split(' ')[0];
            const name = data[0].split(' ')[1];
            const fileLink: string = data[1];
            if (format === 'audio') {
              resultData.additionAudio = [...resultData.additionAudio, {
                audioName: name,
                audioFile: fileLink,
              }];
            } else if (format === 'id') {
              resultData.id = fileLink;
            } else if (format === 'images') {
              resultData.images = [...resultData.images,
              { imagesName: name, imagesFile: fileLink }];
            } else if (format === 'mapData') {
              resultData.mapData = [...resultData.mapData, JSON.parse(fileLink)];
            }
          });
          resultData.mapName = resultData.mapData[0].metadata.Title;
          Object.entries(resultData.additionAudio).forEach((item) => {
            const format = resultData.mapData[0].general.AudioFilename.split(' ').map((item) => item.replace(/[^A-Za-z0-9]/gi, '')).join('');
            if (item[1].audioName === format) {
              resultData.audio = item[1].audioFile;
            }
          });
          dispatch(setNewMap({
            mapName: resultData.mapName,
            audio: resultData.audio,
            images: resultData.images,
            topPlayers: ['andrew', 'grisha', 'billy'],
            additionalAudio: resultData.additionAudio,
            id: resultData.id,
            mapData: resultData.mapData,
          }));
        }
      });
    };
    getMapsData();
  }, [isAuth]);
  return (
    <div className="select-map-page-container">
      <ParallaxBackground />
      <PlayersStatisticList />
      <ul className="select-map-page-container__songs-list">
        {Object.values(mapsData).map((songData) => (
          <React.Fragment key={window.crypto.randomUUID()}>
            <SongListItem
              songData={songData}
              difficulty="Easy"
            />
            <SongListItem
              songData={songData}
              difficulty="Hard"
            />
          </React.Fragment>
        ))}
      </ul>
      <SelectMapPageFooter />
      <div className="select-map-page-container__osu-button-wrapper">
        <OsuButton path="/game" />
      </div>
    </div>
  );
}

export default SelectMap;
