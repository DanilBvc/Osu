/* eslint-disable max-len */

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';
import IReducers from '../../types/reducers/reducersType';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import playMenuItemClickSound from '../../utils/soundsPlayHandlers/playMenuItemClickSound';
import playMenuItemHoverSound from '../../utils/soundsPlayHandlers/playMenuItemHoverSound';
import useParseMaps from '../../customHooks/useParseMaps';

function MainPage() {
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  useParseMaps();

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
