/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import setUserData from '../../store/actionCreators/userData/setUserData';
import { auth, db, storage } from '../../firebase/firebase';
import { userDataState } from '../../types/userDataTypes/userData';

function RegisterCmponents() {
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
              });
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
      const { user } = userCredential;
      if (user.email !== null && user.photoURL !== null && user.displayName !== null) {
        dispatch(setUserData({
          name: user.displayName, email: user.email, avatar: user.photoURL, accessToken: 'user.accessToken', performance: 0, accuracy: 0, lvl: 0, uuid: user.uid,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <p>Регистрация</p>
        <div>
          <p>Имя</p>
          <input value={name} onChange={(e) => { setName(e.target.value); }} type="text" required />
        </div>
        <div>
          <p>Почта</p>
          <input value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" required />
        </div>
        <div>
          <p>Пароль</p>
          <input value={password} onChange={(e) => { setPassword(e.target.value); }} type="password" required />
        </div>
        <div>
          <div>
            <p>Выберите ваш аватар</p>
            <input onChange={(e) => { handleFile(e); }} type="file" />
          </div>
          <button onClick={() => { handleRegister(email, password); }} type="submit">Регистрация</button>
        </div>
      </div>
      <p>Уже есть аккаунт?</p>
    </div>
  );
}

export default RegisterCmponents;
