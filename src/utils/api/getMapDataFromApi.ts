/* eslint-disable max-len */
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import uuid from 'react-uuid';
import JSZip, { files } from 'jszip';
import { db } from '../../firebase/firebase';
import getDataFromOsuMap from '../uploadMap/uploadByBytes/parseOusFile';
import uploadImageByBytes from '../uploadMap/uploadByBytes/uploadImageByBytes';
import uploadAudioByBytes from '../uploadMap/uploadByBytes/uploadAudioByBytes';
import uploadAdditionAudioByBytes from '../uploadMap/uploadByBytes/uploadAdditionAudioByBytes';
import uploadVideoByBytes from '../uploadMap/uploadByBytes/uploadVideoByBytes';

const getMapDataFromApi = () => {
  const regex = /[^a-zа-я0-9]+/gi;
  const url = 'https://de1.sayobot.cn/beatmaps/14/0662/mini?filename=140662%20cYsmix%20feat%20Emmy%20%2d%20Tear%20Rain';
  const id = url.split('?filename=')[1].split('%')[0];
  fetch(url)
    .then((response) => response.blob())
    .then(JSZip.loadAsync)
    .then((zip) => {
      const mapsDataRef = doc(db, 'maps', id);
      setDoc(mapsDataRef, {
        id,
      });
      zip.forEach((entry) => {
        if (entry !== null) {
          const file = zip.file(entry);
          const fileExtension = entry.split('.')[entry.split('.').length - 1];
          if (file !== null && fileExtension === 'osu') {
            file.async('string').then((content) => {
              const mapData = getDataFromOsuMap(content);
              updateDoc(doc(db, 'maps', id), {
                [`mapData ${file.name.replace(regex, '').trim()}`]: JSON.stringify(mapData),
              });
            });
          } else if (file !== null && (fileExtension === 'jpg' || fileExtension === 'png')) {
            file.async('uint8array').then(async (data) => {
              const images = await uploadImageByBytes(data, id, file.name);
              updateDoc(doc(db, 'maps', id), {
                [`images ${file.name.replace(regex, '').trim()}`]: images,
              });
            });
          } else if (file !== null && (fileExtension === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg')) {
            file.async('uint8array').then(async (data) => {
              const audio = await uploadAudioByBytes(data, id, file.name, fileExtension);
              updateDoc(doc(db, 'maps', id), {
                [`audio ${file.name.replace(regex, '').trim()}`]: audio,
              });
            });
          } else if (file !== null && (fileExtension === 'mp4' || fileExtension === 'avi')) {
            file.async('uint8array').then(async (data) => {
              const video = await uploadVideoByBytes(data, id, file.name, fileExtension);
              updateDoc(doc(db, 'maps', id), {
                [`video ${file.name.replace(regex, '').trim()}`]: video,
              });
            });
          }
        }
      });
    });
};

export default getMapDataFromApi;
