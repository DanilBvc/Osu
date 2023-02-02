import InfoPanel from '../../components/infoPanel/InfoPanel';
import MainButton from '../../components/mainButton/MainButton';
import MainMenu from '../../components/mainMenu/MainMenu';

import './mainPage.scss';

function MainPage(): JSX.Element {
  return (
    <main className="main">
      <InfoPanel />
      <div className="wrapper">
        <MainButton />
        <MainMenu />
      </div>

    </main>

  );
}

export default MainPage;
