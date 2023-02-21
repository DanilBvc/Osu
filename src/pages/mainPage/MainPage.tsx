import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  doc, getDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';
import IReducers from '../../types/reducers/reducersType';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import getMapsData from '../../utils/api/getMapsData';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';
import playMenuItemClickSound from '../../utils/soundsPlayHandlers/playMenuItemClickSound';
import playMenuItemHoverSound from '../../utils/soundsPlayHandlers/playMenuItemHoverSound';

function MainPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  const userStae = useSelector((state: IReducers) => state.userDataReducer);
  const storeMapsData = useSelector((state: IReducers) => state.mapsDataReducer);

  // TODO: unite maps request with the selectPage one
  useEffect(() => {
    if (userStae.uuid !== null) {
      getMapsData(userStae.uuid).then(
        (mapsData) => {
          mapsData.forEach((mapData) => {
            if (storeMapsData.findIndex((storeMapData) => storeMapData.id === mapData.id) === -1) {
              dispatch(setNewMap({
                mapName: mapData.mapName,
                audio: mapData.audio,
                images: mapData.images,
                topPlayers: ['andrew', 'grisha', 'billy'],
                additionalAudio: mapData.additionAudio,
                id: mapData.id,
                mapData: mapData.mapData,
              }));
            }
          });
        }
      );
    }
  }, []);

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
    <main className="main" style={!isAuth ? { pointerEvents: 'none' } : {}}>
      <ParallaxBackground />
      <InfoPanel />
      <div className="osu-button-menu-wrapper">
        <ul className="osu-button-menu-list">
          <li className="osu-button-menu-list__item">
            <Link
              className="list-item-link"
              to="/selectMap"
              onClick={playMenuItemClickSound}
              onMouseEnter={playMenuItemHoverSound}
            >
              Play
            </Link>
          </li>
          <li className="osu-button-menu-list__item">
            <Link
              className="list-item-link"
              to="/download"
              onClick={playMenuItemClickSound}
              onMouseEnter={playMenuItemHoverSound}
            >
              Add map
            </Link>
          </li>
        </ul>
        <div className="osu-button-wrapper">
          <OsuButton />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default MainPage;
