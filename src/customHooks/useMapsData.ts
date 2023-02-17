import { getDocs, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/firebase';
import setNewMap from '../store/actionCreators/mapsData/setNewMap';
import { MapDataFromApi } from '../types/mapsDataTypes/mapsDataFromApiTypes';

const useMapsData = () => {
  const dispatch = useDispatch();
  const getMapsData = async () => {
    const querySnapshot = await getDocs(collection(db, 'maps'));

    querySnapshot.forEach((document) => {
      const mapsData = document.data();
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

  return {
    getMapsData,
  };
};

export default useMapsData;
