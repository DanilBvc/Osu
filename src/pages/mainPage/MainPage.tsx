import { useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';
import IReducers from '../../types/reducers/reducersType';
import BigButton from '../../components/bigButton/BigButton';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';

function MainPage() {
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);

  return (
    <main className="main" style={!isAuth ? { pointerEvents: 'none' } : {}}>
      <ParallaxBackground />
      <InfoPanel />
      <div className="main__ose-button-wrapper">
        <OsuButton path="/selectMap" />
      </div>
      <BigButton />
      <Footer />
    </main>

  );
}

export default MainPage;
