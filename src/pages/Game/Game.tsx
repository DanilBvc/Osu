import { useState } from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import GameField from './GameField';

function Game(): JSX.Element {
  const activeGameInfo = useSelector((state: IReducers) => state.activeGameReduccer);
  // const activeGameInfo = useSelector((state: IReducers) => state.mapsDataReducer[0]);
  // const [difficulty, setDifficulty] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(0);

  const { images, mapName, audio } = activeGameInfo;

  return (
    <>
      {/* <GamePopup isOpen={!difficulty} data={activeGameInfo.mapData} /> */}
      <div
        style={{ backgroundImage: `url(${images[0].imagesFile})` }}
        className="game-background"
      >
        <div className="game-title">{mapName}</div>
        <GameField game={activeGameInfo.mapData[difficulty]} audio={audio as string} />
      </div>
    </>
  );
}

export default Game;
