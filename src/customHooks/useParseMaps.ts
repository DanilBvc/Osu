/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import {
  getDocs, collection, getDoc, doc
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/firebase';
import setNewMap from '../store/actionCreators/mapsData/setNewMap';
import { MapDataFromApi, topPlayerItem } from '../types/mapsDataTypes/mapsDataFromApiTypes';
import IReducers from '../types/reducers/reducersType';
import useUnsub from './useUnsub';

function useParseMaps() {
  const storeMapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  const state = useSelector((state: IReducers) => state.userDataReducer);
  const { isAuth } = useUnsub();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMapsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach(async (document) => {
        const mapsData = document.data();
        if (state.maps?.includes(+mapsData.id)
          && storeMapsData.findIndex((storeMapData) => storeMapData.id === document.data().id) === -1) {
          const resultData: MapDataFromApi = {
            id: '',
            mapName: '',
            audio: '',
            additionAudio: [],
            images: [],
            mapData: [],
            topPlayers: [],
          };
          await getDoc(doc(db, 'top', document.data().id)).then((data) => {
            resultData.topPlayers = [data.data() as {
              [key: string]: [] | topPlayerItem[];
            }];
          });
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
              // eslint-disable-next-line @typescript-eslint/indent
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
            topPlayers: resultData.topPlayers,
            additionalAudio: resultData.additionAudio,
            id: resultData.id,
            mapData: resultData.mapData,
          }));
        }
      });
    };
    getMapsData();
  }, [isAuth]);

  return {
    isAuth,
    storeMapsData,
  };
}

export default useParseMaps;
