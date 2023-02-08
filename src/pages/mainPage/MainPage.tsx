import { useSelector } from 'react-redux';
import Footer from '../../components/footer/Footer';
import InfoPanel from '../../components/infoPanel/InfoPanel';
import './mainPage.scss';

import IReducers from '../../types/reducers/reducersType';
import BigButton from '../../components/bigButton/BigButton';

function MainPage() {
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  return (
    <main className="main" style={!isAuth ? { pointerEvents: 'none' } : {}}>
      <InfoPanel />
      <BigButton />
      <Footer />
    </main>

  );
}

export default MainPage;
