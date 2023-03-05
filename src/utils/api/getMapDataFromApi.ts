/* eslint-disable no-return-await */
/* eslint-disable max-len */
import {
  arrayUnion,
  doc, getDoc, setDoc, updateDoc
} from 'firebase/firestore';
import JSZip from 'jszip';
import { db } from '../../firebase/firebase';
import getDataFromOsuMap from '../uploadMap/uploadByBytes/parseOusFile';
import uploadImageByBytes from '../uploadMap/uploadByBytes/uploadImageByBytes';
import uploadAudioByBytes from '../uploadMap/uploadByBytes/uploadAudioByBytes';
import uploadVideoByBytes from '../uploadMap/uploadByBytes/uploadVideoByBytes';

const documentExist = async (collection: string, document: string) => {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);
  if (docSnap.data() === undefined) {
    const mapsDataRef = doc(db, collection, document);
    setDoc(mapsDataRef, {
      id: document,
    });
    return mapsDataRef;
  }
  return docRef;
};
const getMapDataFromApi = async (mapId: number, mapName: string) => {
  const regex = /[^a-zа-я0-9]+/gi;
  const splittedId = mapId.toString().split('');
  const idForRequest = splittedId.map((item, i) => {
    if (splittedId.length <= 7) {
      if (i === 2) {
        return `${item}/`;
      }
      return item;
    }
    if (i === 3) {
      return `${item}/`;
    }
    return item;
  }).join('');
  const url = `https://de1.sayobot.cn/beatmaps/${idForRequest}/mini?filename=${mapId}${mapName}`;
  const id = mapId.toString();
  const request = fetch(url)
    .then((response) => response.blob())
    .then(JSZip.loadAsync)
    .then(async (zip) => {
      const mapsDataRef = await documentExist('maps', id);
      const topMapRef = await documentExist('top', id);
      zip.forEach((entry) => {
        if (entry !== null) {
          const file = zip.file(entry);
          const fileExtension = entry.split('.')[entry.split('.').length - 1];
          if (file !== null && fileExtension === 'osu') {
            file.async('string').then(async (content) => {
              const mapData = getDataFromOsuMap(content);
              getDoc(topMapRef).then(async (docSnap) => {
                if (docSnap.get(mapData.metadata.Version) === undefined) {
                  await updateDoc(topMapRef, {
                    [mapData.metadata.Version]: [],
                  });
                }
              });
              await updateDoc(mapsDataRef, {
                [`mapData ${file.name.replace(regex, '').trim()}`]: JSON.stringify(mapData),
              });
            });
          } else if (file !== null && (fileExtension === 'jpg' || fileExtension === 'png')) {
            file.async('uint8array').then(async (data) => {
              const images = await uploadImageByBytes(data, id, file.name);
              await updateDoc(mapsDataRef, {
                [`images ${file.name.replace(regex, '').trim()}`]: images,
              });
            });
          } else if (file !== null && (fileExtension.toLowerCase() === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg')) {
            file.async('uint8array').then(async (data) => {
              const audio = await uploadAudioByBytes(data, id, file.name, fileExtension);
              await updateDoc(mapsDataRef, {
                [`audio ${file.name.replace(regex, '').trim()}`]: audio,
              });
            });
          } else if (file !== null && (fileExtension === 'mp4' || fileExtension === 'avi')) {
            file.async('uint8array').then(async (data) => {
              const video = await uploadVideoByBytes(data, id, file.name, fileExtension);
              await updateDoc(mapsDataRef, {
                [`video ${file.name.replace(regex, '').trim()}`]: video,
              });
            });
          }
        }
      });
    });
  await request;
  return false;
};

export default getMapDataFromApi;
