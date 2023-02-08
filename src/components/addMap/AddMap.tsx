/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import uuid from 'react-uuid';
import JSZip from 'jszip';
import uploadSoundTodb from '../../utils/uploadMap/uploadSound';
import uploadAlbumCover from '../../utils/uploadMap/uploadAlbumCover';
import uploadMapName from '../../utils/uploadMap/uploadMapName';
import handleUploadData from '../../utils/uploadMap/handleUploadData';
import uploadAdditonalSounds from '../../utils/uploadMap/uploadAdditionalAudio';
import uploadAdditionalPictures from '../../utils/uploadMap/uploadAdditionalPictures';
import getMapDataFromApi from '../../utils/api/getMapDataFromApi';

function AddMap() {
  const [file, setFile] = useState<File>();
  const [albumsCover, setAlbumsCover] = useState<File>();
  const [mapName, setMapName] = useState('');
  const [additionalSound, setAdditionalSounds] = useState<File[]>();
  const [additionalPict, setAdditionalPict] = useState<File[]>();
  const id = uuid();
  const handleAudioFile = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  const handleAlbumsCover = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setAlbumsCover(files[0]);
    }
  };
  // getMapDataFromApi();
  const handleAdditionalSound = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files !== null) {
      setAdditionalSounds([...Array.from(files)]);
    }
  };
  const handleAdditionalPict = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files !== null) {
      setAdditionalPict([...Array.from(files)]);
    }
  };
  const handleSend = async () => {
    if (file !== undefined && albumsCover !== undefined) {
      const audioLink = await uploadSoundTodb(file, id);
      const albumCover = await uploadAlbumCover(albumsCover, id);
      const mapNames = await uploadMapName(mapName, id);
      const additionalAudio = additionalSound !== undefined // undefined
        ? await uploadAdditonalSounds(additionalSound, id)
        : [];
      const additionalPictures = additionalPict !== undefined // undefined
        ? await uploadAdditionalPictures(id, additionalPict)
        : [];
      handleUploadData(id, mapNames, audioLink, albumCover, ['billy', 'anrew', 'artem'], additionalAudio, additionalPictures);
    }
  };

  return (
    <div>
      <div />
      <p>Upload sound</p>
      <input type="file" required onChange={(e) => { handleAudioFile(e); }} name="" id="" />
      <p>Upload album cover</p>
      <input type="file" required onChange={(e) => { handleAlbumsCover(e); }} />
      <p>Map name</p>
      <input type="text" required onChange={(e) => { setMapName(e.target.value); }} />
      <p>Upload additional sounds</p>
      <input type="file" multiple onChange={(e) => { handleAdditionalSound(e); }} />
      <p>Upload additional pict</p>
      <input type="file" multiple onChange={(e) => { handleAdditionalPict(e); }} />
      <button type="submit" onClick={() => { handleSend(); }}>send</button>
    </div>
  );
}

export default AddMap;
