import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import uploadSoundTodb from './uploadSound';

const uploadAdditonalSounds = async (file: File[], id: string) => {
  const deployLinks: string[] = [];
  for (let i = 0; i < file.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const sound = await uploadSoundTodb(file[i], id, 'additional');
    deployLinks.push(sound);
  }
  return deployLinks;
};
export default uploadAdditonalSounds;
