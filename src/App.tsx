import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from './pages/mainPage/MainPage';
import NotFound from './pages/notFound/NotFound';
import Game from './pages/Game/Game';
import SelectMap from './pages/selectMap/SelectMap';
import './globalStyles/global.scss';
import PrivateRoutes from './utils/RequireAuth/PrivatRoutes';

import AuthPopup from './components/authPopup/AuthPopup';
import IReducers from './types/reducers/reducersType';
import AddMap from './components/addMap/AddMap';

function App() {
  const isAuth = useSelector((state: IReducers) => !!state.userDataReducer.email);
  return (
    <>
      {!isAuth ? <AuthPopup /> : null}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/game" element={<Game />} />
          <Route path="/selectMap" element={<SelectMap />} />
          <Route path="/download/*" element={<AddMap />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
