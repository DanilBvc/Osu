import React from 'react';
import { IPlayersStatisticList } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './PlayersStatisticListStyles.scss';

function PlayersStatisticList(props: IPlayersStatisticList) {
  const { clickedSongListData } = props;

  return (
    <div className="players-statistic-list-wrapper">
      <ul className="players-statistic-list">
        { clickedSongListData
          ? (
            clickedSongListData.topPlayers.map((playerName) => (
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
