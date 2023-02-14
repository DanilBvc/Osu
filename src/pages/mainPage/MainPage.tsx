/* eslint-disable import/order */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import MainButton from '../../components/mainButton/MainButton';
import MainMenu from '../../components/mainMenu/MainMenu';

import './mainPage.scss';
import {
  doc, getDoc
} from 'firebase/firestore';
import LoginComponent from '../../components/Login/LoginComponent';
import useAuth from '../../customHooks/useAuth';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';

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
            && user.displayName !== null
            && user.photoURL !== null) {
            dispatch(setUserData({
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              accessToken: 'user.accessToken',
              performance: userData.performance,
              accuracy: userData.accuracy,
              lvl: userData.lvl,
              uuid: user.uid,
              maps: userData.maps,
            }));
          }
        }
      }
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      {isAuth ? (
        <main className="main">
          <InfoPanel />
          <div className="wrapper">
            <MainButton />
            <MainMenu />
          </div>
          <Footer />
        </main>
      ) : <LoginComponent />}

    </div>
  );
}

export default MainPage;
