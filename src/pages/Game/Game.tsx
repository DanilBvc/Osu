import { useSelector } from 'react-redux';
import useClientResolution from '../../customHooks/useClientResolution';
import useGameOptions from '../../customHooks/useGameOptions';

import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import GameField from './GameField';

function Game(): JSX.Element {
  const activeGameInfo = useSelector((state: IReducers) => state.activeGameReduccer);
  useClientResolution();
  useGameOptions();

  const { images, mapName, audio } = activeGameInfo;

  return (
    <div
      style={{ backgroundImage: `url(${images[0].imagesFile})` }}
      className="game-background"
    >
      <div className="game-title">{mapName}</div>
      <GameField game={activeGameInfo.mapData[0]} audio={audio as string} />
    </div>
  );
}

export default Game;
