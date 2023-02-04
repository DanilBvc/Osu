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
  collection, doc, getDoc, getDocs
} from 'firebase/firestore';
import LoginComponent from '../../components/Login/LoginComponent';
import useAuth from '../../customHooks/useAuth';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';
import AddMap from '../../components/addMap/AddMap';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import RegisterCmponents from '../../components/Register/RegisterCmponents';
import useUnSub from '../../customHooks/useUnSub';

function MainPage() {
  const {
    isAuth, email, avatar, name, accuracy, lvl, performance,
  } = useAuth();
  useUnSub();
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
