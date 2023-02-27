/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import setUserData from '../../store/actionCreators/userData/setUserData';
import { auth, db, storage } from '../../firebase/firebase';
import './registerCmponentsStyles.scss';

function RegisterCmponents() {
  const [userIsRegistered, setUserIsRegistered] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<Blob>();
  const dispatch = useDispatch();
  const handleFile = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${name}`);
      if (file !== undefined) {
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, 'users', userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName: name,
                email,
                photoURL: downloadURL,
                performance: 0,
                accuracy: 0,
                lvl: 0,
                maps: [],
              });
              setUserIsRegistered(false);
            } catch (err) {
              setError(err as string);
            }
          });
        });
      }
      const { user } = userCredential;
      if (user.email !== null && user.photoURL !== null && user.displayName !== null) {
        dispatch(setUserData({
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          accessToken: 'user.accessToken',
          performance: 0,
          accuracy: 0.0,
          lvl: 0,
          uuid: user.uid,
          maps: [],
        }));
      }
    } catch (err) {
      setError(err as string);
    }
  };

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
            if (!userIsRegistered) {
              setUserIsRegistered(true);
            }
          }
        }
      }
    });
    return () => {
      unsub();
    };
  }, [userIsRegistered]);
  return (
    <div>
      {!error ? null : (
        <div className="error-msg">
          <i className="fa fa-times-circle"></i>
          {error.toString()}
        </div>
      )}
      <div className="sing-up">
        <h1 className="auth-form-headline">Sign up</h1>
        <div>
          <p className="sing-up__input-title">Name</p>
          <input value={name} onChange={(e) => { setName(e.target.value); }} type="text" required />
        </div>
        <div>
          <p className="sing-up__input-title">E-mail</p>
          <input value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" required />
        </div>
        <div>
          <p className="sing-up__input-title">Password</p>
          <input value={password} onChange={(e) => { setPassword(e.target.value); }} type="password" required />
        </div>
        <div>
          <div>
            <p className="sing-up__input-title">Your avatar</p>
            <input onChange={(e) => { handleFile(e); }} type="file" />
          </div>
          <button className="sing-up__button hover-pink-bgc" onClick={() => { handleRegister(email, password); }} type="submit">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterCmponents;
