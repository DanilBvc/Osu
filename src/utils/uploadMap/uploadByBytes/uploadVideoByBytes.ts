import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';

const uploadVideoByBytes = async (
  arrayOfBytes: Uint8Array,
  id: string,
  name: string,
  format: string
) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const storageRef = ref(storage, `/sounds/${id}/video/${name}`);
  const metadata = {
    contentType: `video/${format}`,
  };
  const bytes = new Uint8Array(arrayOfBytes);
  const result = new Promise((resolve: (value: string) => void, reject) => {
    uploadBytes(storageRef, bytes, metadata).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      resolve(url);
    });
  });
  const deployLink = await result;
  return deployLink;
};
export default uploadVideoByBytes;
