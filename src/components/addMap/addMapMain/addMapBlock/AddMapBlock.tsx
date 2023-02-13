/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {
  arrayRemove,
  arrayUnion, doc, getDoc, updateDoc
} from 'firebase/firestore';
import IReducers from '../../../../types/reducers/reducersType';
import { auth, db } from '../../../../firebase/firebase';
import setUserData from '../../../../store/actionCreators/userData/setUserData';
import getMapDataFromApi from '../../../../utils/api/getMapDataFromApi';
import handleUserMaps from '../../../../store/actionCreators/userData/handleUserMaps';
import StarComponent from '../starComponent/StarComponent';

interface IProps {
  img: string;
  audio: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beat: any;
  handleLoadingMap: (value: boolean) => void;
  loadingMap: boolean;
}

function AddMapBlock({
  img, audio, beat, handleLoadingMap, loadingMap,
}: IProps) {
  const userDataReducer = useSelector((data: IReducers) => data.userDataReducer);
  const dispatch = useDispatch();
  const handleAddMap = async (id: number, mapName: string, isInclude?: boolean) => {
    if (!isInclude) {
      handleLoadingMap(true);
      await getMapDataFromApi(id, mapName);
      handleLoadingMap(false);
    }
    dispatch(handleUserMaps({
      name: '',
      email: '',
      avatar: '',
      accessToken: '',
      performance: 0,
      accuracy: 0,
      lvl: 0,
      uuid: '',
      maps: id,
    }));
    const washingtonRef = doc(db, 'users', `${userDataReducer.uuid}`);
    if (isInclude) {
      await updateDoc(washingtonRef, {
        maps: arrayRemove(id),
      });
    } else {
      await updateDoc(washingtonRef, {
        maps: arrayUnion(id),
      });
    }
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && !userDataReducer.uuid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (user.email !== null
            && user.displayName !== null
            && user.photoURL !== null && userData.performance !== null
            && userData.accuracy !== null
            && userData.lvl !== null) {
            dispatch(setUserData({
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL,
              accessToken: 'user.accessToken',
              performance: userData.performance,
              accuracy: userData.accuracy,
              lvl: userData.lvl,
              uuid: userData.uid,
              maps: userData.maps,
            }));
          }
        }
      }
    });
    unsub();
  }, []);
  return (
    <div className="addMapBlock-wrapper">
      <img className="addMapBlock-img" src={img} alt={`img${beat[0].sid}`} />
      <div className="addMapBlock-overlay"></div>
      <div className="addMapBlock-title">{beat[0].title}</div>
      <div className="addMapBlock-artist">{beat[0].artist}</div>
      <div className="addMapBlock-creator">{beat[0].creator}</div>
      <div className="addMapBlock-approved">{beat[0].ranked ? 'RANKED' : 'NON RANKED'}</div>
      <div className={`addMapBlock-like icon-heart ${loadingMap ? 'hidden' : ''}`}>
        <button
          type="button"
          className={`favorite-button ${userDataReducer.maps?.includes(beat[0].sid) ? 'is-favorite' : ''}`}
          onClick={() => {
            handleAddMap(
              beat[0].sid,
              beat[0].title,
              userDataReducer.maps?.includes(beat[0].sid)
            );
          }}
        >
          <i className="fas fa-heart favorite__icon favorite--enable"></i>
          <i className="far fa-heart favorite__icon favorite--not"></i>
        </button>
      </div>
      <div className="addMapBlock-difficulties">
        {beat.length > 12
          ? (
            <>
              <div className="difficult Extra"></div>
              <span className="difficulty-count">{beat.length}</span>
            </>
          )
          : beat.map((item: { star: number }) => (
            <StarComponent
              key={item.star}
              star={item.star}
            />
          ))}
      </div>
      <div className="addMapBlock-length">{`${Math.floor(beat[0].length / 60)}:${beat[0].length % 60 < 10 ? `${beat[0].length % 60}0` : beat[0].length % 60}`}</div>
    </div>
  );
}

export default AddMapBlock;
