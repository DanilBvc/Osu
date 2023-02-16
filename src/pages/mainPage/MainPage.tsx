import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';
import IReducers from '../../types/reducers/reducersType';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import getMapsData from '../../utils/api/getMapsData';

function MainPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  const storeMapsData = useSelector((state: IReducers) => state.mapsDataReducer);

  useEffect(() => {
    getMapsData().then(
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
  }, []);

  return (
    <main className="main" style={!isAuth ? { pointerEvents: 'none' } : {}}>
      <ParallaxBackground />
      <InfoPanel />
      <div className="main__osu-button-wrapper">
        <OsuButton path="/selectMap" />
      </div>
      <Footer />
    </main>
  );
}

export default MainPage;
