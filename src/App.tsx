import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import NotFound from './pages/notFound/NotFound';
import Game from './pages/Game/Game';
import SelectMap from './pages/selectMap/SelectMap';
import './globalStyles/global.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/game" element={<Game />} />
      <Route path="/selectMap" element={<SelectMap />} />
    </Routes>
  );
}

export default App;
