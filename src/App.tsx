import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import NotFound from './pages/notFound/NotFound';
import Game from './pages/Game/Game';
import SelectMap from './pages/selectMap/SelectMap';
import './globalStyles/global.scss';
import AddMap from './components/addMap/AddMap';
import RegisterCmponents from './components/Register/RegisterCmponents';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/game" element={<Game />} />
      <Route path="/selectMap" element={<SelectMap />} />
      <Route path="/register" element={<RegisterCmponents />} />
      <Route path="/download/*" element={<AddMap />} />
    </Routes>
  );
}

export default App;
