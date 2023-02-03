import uploadAlbumCover from './uploadAlbumCover';

const uploadAdditionalPictures = async (id: string, files: File[]) => {
  const deployLink: string[] = [];
  files.forEach(async (file) => {
    const deployFile = await uploadAlbumCover(file, id, 'additionalPict');
    deployLink.push(deployFile);
  });
  return deployLink;
};
export default uploadAdditionalPictures;
