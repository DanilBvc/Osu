import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import SongListItem from '../../components/selectMap/songList/SongListItem';
import IReducers from '../../types/reducers/reducersType';

import PlayersStatisticList from '../../components/selectMap/playersStatisticList/PlayersStatisticList';
import SelectMapPageFooter from '../../components/selectMap/footer/SelectMapPageFooter';
import OsuButton from '../../components/selectMap/osuButton/OsuButton';
import ParallaxBackground from '../../components/selectMap/parallaxBacground/ParallaxBackground';
import './SelectMapPageStyles.scss';
import useParseMaps from '../../customHooks/useParseMaps';

function SelectMap() {
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const { storeMapsData } = useParseMaps();
  return (
    <div className="select-map-page-container">
      <ParallaxBackground />
      <PlayersStatisticList />
      <ul className="select-map-page-container__songs-list">
        {Object.values(storeMapsData).map((commonSongData) => (
          selectedSongID === commonSongData.id
            ? (
              <React.Fragment key={window.crypto.randomUUID()}>
                {commonSongData.mapData.map((difficultySongData, songDifficultyIndex) => (
                  <SongListItem
                    key={window.crypto.randomUUID()}
                    songData={commonSongData}
                    difficulty={difficultySongData.metadata.Version}
                    songDifficultyIndex={songDifficultyIndex}
                  />
                ))}
              </React.Fragment>
            )
            : (
              <SongListItem
                key={window.crypto.randomUUID()}
                songData={commonSongData}
                difficulty={commonSongData.mapData[0].metadata.Version}
                songDifficultyIndex={0}
              />
            )
        ))}
      </ul>
      <SelectMapPageFooter />
      <Link
        className="select-map-page-container__osu-button-wrapper"
        style={{ pointerEvents: selectedSongID ? 'auto' : 'none' }}
        to="/game"
      >
        <OsuButton />
      </Link>
    </div>
  );
}

export default SelectMap;
