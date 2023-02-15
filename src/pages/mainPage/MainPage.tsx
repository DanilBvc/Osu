import { useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';
import {
  doc, getDoc
} from 'firebase/firestore';
import IReducers from '../../types/reducers/reducersType';
import BigButton from '../../components/bigButton/BigButton';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import LoginComponent from '../../components/Login/LoginComponent';
import useAuth from '../../customHooks/useAuth';
import { auth, db } from '../../firebase/firebase';
import setUserData from '../../store/actionCreators/userData/setUserData';

function MainPage() {
 const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
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
    <main className="main" style={!isAuth ? { pointerEvents: 'none' } : {}}>
      <ParallaxBackground />
      <InfoPanel />
      <div className="main__osu-button-wrapper">
        <OsuButton path="/selectMap" />
      </div>
      <BigButton />
      <Footer />
    </main>

  );
}

export default MainPage;
