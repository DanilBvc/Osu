import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import './PlayersStatisticListStyles.scss';

function PlayersStatisticList() {
  const mapsData = useSelector((state: IReducers) => state.mapsDataReducer);
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const selectedSongListItemData = mapsData.filter((songData) => songData.id === selectedSongID)[0];
  const selectedDifficultySongIndex = useSelector(
    (state: IReducers) => state.songDifficultyIndexReducer
  );
  let selectedDifficultyName = '';

  if (selectedSongListItemData) {
    selectedDifficultyName = (
      selectedSongListItemData.mapData[selectedDifficultySongIndex].metadata.Version
    );
  }

  return (
    <div className="players-statistic-list-wrapper">
      <h1 className="players-statistic-list__headline">Top players:</h1>
      <ul className="players-statistic-list">
        {selectedSongListItemData
          && selectedSongListItemData.topPlayers[0][selectedDifficultyName].length > 0
          ? (
            selectedSongListItemData.topPlayers[0][selectedDifficultyName].map((playerData) => (
              <li className="players-statistic-list__item" key={window.crypto.randomUUID()}>
                <figure className="player-avatar-wrapper">
                  <img className="player-avatar" src={playerData.userImg} alt="player avatar" />
                </figure>
                <div className="player-info">
                  <ul className="player-info__list">
                    <li><h3>{playerData.userName}</h3></li>
                    <li>{`Score: ${playerData.userScore}`}</li>
                  </ul>
                </div>
              </li>
            ))
          )
          : (
            <li className="players-statistic-list__item">
              <h2>
                { selectedSongListItemData
                  && selectedSongListItemData.topPlayers[0][selectedDifficultyName].length === 0
                  ? 'No player records'
                  : 'Choose map'}
              </h2>
            </li>
          )}
      </ul>
    </div>
  );
}

export default PlayersStatisticList;
