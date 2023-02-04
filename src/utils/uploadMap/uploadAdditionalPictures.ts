/* eslint-disable no-await-in-loop */
import uploadAlbumCover from './uploadAlbumCover';

const uploadAdditionalPictures = async (id: string, files: File[]) => {
  const deployLink: string[] = [];
  for (let i = 0; i < files.length; i += 1) {
    const deployFile = await uploadAlbumCover(files[i], id, 'additionalPict');
    deployLink.push(deployFile);
  }
  return deployLink;
};
export default uploadAdditionalPictures;
