import './playerCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import IReducers from '../../types/reducers/reducersType';
import userAvatarPlaceHolder from '../../assets/images/userAvatarPlaceholderImage.png';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';

export default function PlayerCard(): JSX.Element {
  const {
    name,
    performance,
    accuracy,
    avatar,
    lvl,
  } = useSelector((state: IReducers) => state.userDataReducer);
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
    <div className="playerCard">
      <img className="playerCard-avatar" src={avatar || userAvatarPlaceHolder} alt="avatar" />
      <div className="playerCard-info">
        <p className="playerCard-name">{name}</p>
        <p className="playerCard-performance">
          Performance:
          {' '}
          {performance}
          {' '}

        </p>
        <p className="playerCard-accuracy">
          Accuracy:
          {' '}
          {accuracy}
          %
        </p>
        <div className="playerCard-lvl lvl">
          <p className="lvl-count">
            lvl:
            {' '}
            {lvl}
          </p>
          <div className="lvl-bar">
            <div className="lvl-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
