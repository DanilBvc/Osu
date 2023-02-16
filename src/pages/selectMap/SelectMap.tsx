import React from 'react';
import { useSelector } from 'react-redux';
import SongListItem from '../../components/selectMap/songList/SongListItem';
import IReducers from '../../types/reducers/reducersType';
import useUnSub from '../../customHooks/useUnSub';
import PlayersStatisticList from '../../components/selectMap/playersStatisticList/PlayersStatisticList';
import SelectMapPageFooter from '../../components/selectMap/footer/SelectMapPageFooter';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import './SelectMapPageStyles.scss';

function SelectMap() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);

  useUnSub();

  return (
    <div className="select-map-page-container">
      <ParallaxBackground />
      <PlayersStatisticList />
      <ul className="select-map-page-container__songs-list">
        {Object.values(mapsData).map((songData) => (
          <React.Fragment key={window.crypto.randomUUID()}>
            <SongListItem
              songData={songData}
              difficulty="Easy"
            />
            <SongListItem
              songData={songData}
              difficulty="Hard"
            />
          </React.Fragment>
        ))}
      </ul>
      <SelectMapPageFooter />
      <div className="select-map-page-container__osu-button-wrapper">
        <OsuButton path="/game" />
      </div>
    </div>
  );
}

export default SelectMap;
