/* eslint-disable max-len */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

import { Link, useLocation, useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const handleLogin = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (user.email !== null && user.displayName !== null && user.photoURL !== null) {
        dispatch(setUserData({
          name: user.displayName, email: user.email, avatar: user.photoURL, accessToken: 'user.accessToken', performance: userData.performance, accuracy: userData.accuracy, lvl: userData.lvl, uuid: user.uid,
        }));
      }
    } else {
      console.log('No such document!');
    }
    navigate(fromPage, { replace: true });
  };

  return (
    <div className="login">
      <div>
        <p>ВХОД</p>
        <div>
          <p>Логин</p>
          <input value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" />
        </div>
        <div>
          <p>Пароль</p>
          <input value={password} onChange={(e) => { setPassword(e.target.value); }} type="text" />
        </div>
      </div>
      <button onClick={() => { handleLogin(email, password); }} type="submit">Вход</button>
    </div>
  );
}

export default LoginComponent;
