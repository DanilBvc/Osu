import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from './pages/mainPage/MainPage';
import NotFound from './pages/notFound/NotFound';
import SelectMap from './pages/selectMap/SelectMap';
import './globalStyles/global.scss';
import PrivateRoutes from './utils/RequireAuth/PrivatRoutes';

import AuthPopup from './components/authPopup/AuthPopup';
import IReducers from './types/reducers/reducersType';
import useClientResolution from './customHooks/useClientResolution';

import Game from './pages/Game/Game';
import AddMap from './components/addMap/AddMap';
import VictoryPage from './pages/Victory/VictoryPage';

function App() {
  useClientResolution();

  return (
    <>
      <AuthPopup />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/game" element={<Game />} />
          <Route path="/selectMap" element={<SelectMap />} />
          <Route path="/download/*" element={<AddMap />} />
          <Route path="/victory" element={<VictoryPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
