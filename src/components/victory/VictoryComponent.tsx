import React from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import './victory.scss';
// eslint-disable-next-line import/order
import SelectMapPageFooter from '../selectMap/footer/SelectMapPageFooter';

function VictoryComponent() {
  const mapsData = useSelector((state: IReducers) => state.activeGameReduccer);
  const songDiffucult = useSelector((state: IReducers) => state.songDifficultyIndexReducer);
  const gameScore = useSelector((state: IReducers) => state.gameScoreReducer);
  const background = useSelector((state: IReducers) => state.backgroundSourceReducer);
  const currentGame = mapsData.mapData[songDiffucult];
  return (
    <div className="victory__popup">
      <img src={background} alt="" className="victory-background" />
      <div className="victory-header">
        <div className="victory-map-name">
          {currentGame.metadata.Title.toUpperCase()}
        </div>
        <div className="victory-map-author">
          Beatmap by
          {' '}
          {currentGame.metadata.Artist}
        </div>
      </div>
      <div className="victory-content">
        <div className="points-block">
          <span className="points-block-score">Score</span>
          {' '}
          {gameScore.points}
        </div>
        <div className="victory-points-info">
          <div className="victory-points-up">
            <div className="victory-points-300">
              <div className="victory-icon-300">
                300
              </div>
              {gameScore.hits_300}
              X
            </div>
            <div className="victory-points-100">
              <div className="victory-icon-100">
                100
              </div>
              {gameScore.hits_100}
              X
            </div>
            <div className="victory-points-50">
              <div className="victory-icon-50">
                50
              </div>
              {gameScore.hits_50}
              X
            </div>
          </div>
          <div className="victory-points-bottom">
            <div className="victory-combo">
              <div className="victory-combo-title">
                Combo
              </div>

            </div>
            <div className="victory-accurency">
              <div className="victory-accurency-title">
                Accurency
              </div>
              {gameScore.accuracy}
              %
            </div>
          </div>
        </div>
        <SelectMapPageFooter />
      </div>
    </div>
  );
}

export default VictoryComponent;
