import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase/firebase';
import setUserData from '../store/actionCreators/userData/setUserData';
import { setAuthLoadingAction } from '../store/reducers/authLoadingReducer';

function useUnsub() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const setAuthLoading = (status: boolean) => dispatch(setAuthLoadingAction(status));

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);
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
            setIsAuth(true);
          }
        }
        setAuthLoading(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return {
    isAuth,
  };
}

export default useUnsub;
