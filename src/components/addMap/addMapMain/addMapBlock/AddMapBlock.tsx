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
import { BeatData } from '../../../../types/mapsDataTypes/mapsDataFromApiTypes';
import { BigData, ResponseItem } from '../../../../utils/api/fetchMapPreview';

interface IProps {
  img: string;
  audio: string;
  beat: ResponseItem;
  handleLoadingMap: (value: boolean) => void;
  loadingMap: boolean;
  handleAudio: (audio: string) => void;
}

function AddMapBlock({
  img, audio, beat, handleLoadingMap, loadingMap, handleAudio,
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
  console.log(beat);
  return (
    <div className="addMapBlock-wrapper">
      <img className="addMapBlock-img" src={img} alt={`img${beat.sid}`} />
      <div className="addMapBlock-overlay"></div>
      <div className="addMapBlock-title">{beat.title}</div>
      <div className="addMapBlock-artist">{beat.artist}</div>
      <div className="addMapBlock-creator">{beat.creator}</div>
      <div className="addMapBlock-approved">
        {beat.approved === 1 ? 'RANKED' : null}
        {beat.approved === 3 ? 'QUALIFIED' : null}
        {beat.approved === 0 ? 'PENDING' : null}
        {beat.approved === 2 ? 'APPROVED' : null}
        {beat.approved === -1 ? 'WIP' : null}
        {beat.approved === -2 ? 'GRAVEYARD' : null}
        {beat.approved === 4 ? 'LOVED' : null}
      </div>
      <div className="play-sound" onClick={() => { handleAudio(audio); }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>
      </div>
      <div className={`addMapBlock-like icon-heart ${loadingMap ? 'hidden' : ''}`}>
        <button
          type="button"
          className={`favorite-button ${userDataReducer.maps?.includes(beat.sid) ? 'is-favorite' : ''}`}
          onClick={() => {
            handleAddMap(
              beat.sid,
              beat.title,
              userDataReducer.maps?.includes(beat.sid)
            );
          }}
        >
          <i className="fas fa-heart favorite__icon favorite--enable"></i>
          <i className="far fa-heart favorite__icon favorite--not"></i>
        </button>
      </div>
      <div className="addMapBlock-difficulties">
        {beat.bid_data.length > 12
          ? (
            <>
              <div className="difficult Extra"></div>
              <span className="difficulty-count">{beat.bid_data.length}</span>
            </>
          )
          : beat.bid_data.map((item: BigData) => (
            <StarComponent
              key={item.star}
              star={item.star}
            />
          ))}
      </div>
      <div className="addMapBlock-length">{`${Math.floor(beat.bid_data[0].length / 60)}:${beat.bid_data[0].length % 60 < 10 ? `${beat.bid_data[0].length % 60}0` : beat.bid_data[0].length % 60}`}</div>
    </div>
  );
}

export default AddMapBlock;
