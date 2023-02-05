/* eslint-disable import/order */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';

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
import useGetMapsData from '../../customHooks/useGetMapsData';
import IReducers from '../../types/reducers/reducersType';
import BigButton from '../../components/bigButton/BigButton';

function MainPage() {
  return (
    <main className="main">
      <InfoPanel />
      <BigButton />
      <Footer />
    </main>

  );
}

export default MainPage;
