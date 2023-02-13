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
import { MapDataFromApi } from '../../types/mapsDataTypes/mapsDataFromApiTypes';
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
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: IReducers) => state.mapsDataReducer);
  console.log(state);

  useEffect(() => {
    const getMapsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        const resultData: MapDataFromApi = {
          id: '',
          mapName: '',
          audio: '',
          additionAudio: [

          ],
          images: [

          ],
          mapData: [

          ],
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
            resultData.images = [...resultData.images, { imagesName: name, imagesFile: fileLink }];
          } else if (format === 'mapData') {
            resultData.mapData = [...resultData.mapData, JSON.parse(fileLink)];
          }
        });
        resultData.mapName = resultData.mapData[0].metadata.Title;
        Object.entries(resultData.additionAudio).forEach((item) => {
          const format = resultData.mapData[0].general.AudioFilename.split('.').join('');
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
