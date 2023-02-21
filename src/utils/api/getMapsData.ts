import {
  collection, doc, getDoc, getDocs
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { MapDataFromApi } from '../../types/mapsDataTypes/mapsDataFromApiTypes';

const getMapsData = async (id: string) => {
  const querySnapshot = await getDocs(collection(db, 'maps'));
  const userMapsQuerySnashot = await getDoc(doc(db, 'users', id));
  let userMaps: number[] | [] = [];
  if (userMapsQuerySnashot.exists()) {
    userMaps = userMapsQuerySnashot.data().maps as number[];
  } else {
    // doc.data() will be undefined in this case
  }

  const maps: MapDataFromApi[] = [];
  querySnapshot.forEach((document) => {
    const mapsData = document.data();
    const mapId = mapsData.id as string;
    if (mapsData.length !== 0 && userMaps.includes(+mapId as never)) {
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
      maps.push(resultData);
    }
  });

  return maps;
};

export default getMapsData;
