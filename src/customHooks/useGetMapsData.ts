import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import setNewMap from '../store/actionCreators/mapsData/setNewMap';
import { db } from '../firebase/firebase';

const useGetMapsData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getDat = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        dispatch(setNewMap({
          mapName: mapsData.mapName,
          audio: mapsData.audio,
          albumCover: mapsData.albumCover,
          topPlayers: mapsData.topPlayers,
          additionalAudio: mapsData.additionalAudio,
          additionalPictures: mapsData.additionalPictures,
        }));
      });
    };
    getDat();
  });
};
export default useGetMapsData;
