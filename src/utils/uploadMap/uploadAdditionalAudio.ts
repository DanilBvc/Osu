import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
import uploadSoundTodb from './uploadSound';

const uploadAdditonalSounds = async (file: File[], id: string) => {
  const deployLinks: string[] = [];
  file.forEach(async (files) => {
    const sound = await uploadSoundTodb(files, id, 'additional');
    deployLinks.push(sound);
  });
  return deployLinks;
};
export default uploadAdditonalSounds;
