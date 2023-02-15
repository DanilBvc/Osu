import React from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import './PlayersStatisticListStyles.scss';

function PlayersStatisticList() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const newclickedSongListData = mapsData.filter((songData) => songData.id === selectedSongID)[0];

  return (
    <div className="players-statistic-list-wrapper">
      <ul className="players-statistic-list">
        { newclickedSongListData
          ? (
            newclickedSongListData.topPlayers.map((playerName) => (
              <li className="players-statistic-list__item" key={window.crypto.randomUUID()}>
                <figure className="player-avatar-wrapper" />
                <div className="player-info">
                  <ul className="player-info__list">
                    <li><h3>{ playerName }</h3></li>
                    <li>Scores: </li>
                  </ul>
                </div>
              </li>
            ))
          )
          : (<li className="players-statistic-list__item"><h2>No player records</h2></li>) }
      </ul>
    </div>
  );
}

export default PlayersStatisticList;
