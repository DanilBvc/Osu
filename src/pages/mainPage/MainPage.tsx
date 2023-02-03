/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {
  collection, doc, getDoc, getDocs
} from 'firebase/firestore';
import LoginComponent from '../../components/Login/LoginComponent';
import useAuth from '../../customHooks/useAuth';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';
import AddMap from '../../components/addMap/AddMap';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';

function MainPage() {
  const {
    isAuth, email, avatar, name, accuracy, lvl, performance,
  } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (user.email !== null
            && user.accessToken !== null
            && user.displayName !== null
            && user.photoURL !== null) {
            dispatch(setUserData({
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              accessToken: user.accessToken,
              performance: userData.performance,
              accuracy: userData.accuracy,
              lvl: userData.lvl,
              uuid: user.uid,
            }));
          }
        }
      }
    });
    const getDat = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        dispatch(setNewMap({
          mapName: mapsData.mapName, audio: mapsData.audio, albumCover: mapsData.albumCover, topPlayers: mapsData.topPlayers, additionalAudio: mapsData.additionalAudio, additionalPictures: mapsData.additionalPictures,
        }));
      });
    };
    getDat();
    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      {isAuth ? (
        <div>
          <div>{email}</div>
          <div>{avatar ? <img src={avatar} alt="" /> : null}</div>
          <div>{name}</div>
          <div>{accuracy}</div>
          <div>{lvl}</div>
          <div>{performance}</div>
          <button onClick={() => { signOut(auth); }} type="submit">Logout</button>
        </div>
      ) : <LoginComponent />}

    </div>
  );
}

export default MainPage;
