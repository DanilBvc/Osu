import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const handleUploadData = async (
  id: string,
  mapName: string,
  audio: string,
  albumCover: string,
  topPlayers: string[],
  additionalAudio: string[],
  additionalPictures: string[]
) => {
  setDoc(doc(db, 'maps', id), {
    mapName,
    audio,
    albumCover,
    topPlayers,
    additionalAudio,
    additionalPictures,
    id,
  });
};
export default handleUploadData;
