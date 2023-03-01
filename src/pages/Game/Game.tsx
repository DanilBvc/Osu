/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import Konva from 'konva';
import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import audioPlug from '../../assets/plugs/audio-plug.mp3';
import useUpdate from '../../customHooks/useUpdate';
import GameBar from './GameBar/GameBar';
import { resetGameAction } from '../../store/reducers/game/gameScoreReducer';
import HitObjects from './hitObjects';
import Preloader from './Preloader/Preloader';
import { useAudioElement } from '../../contexts/audioContextWrapper';
import VictoryComponent from '../../components/victory/VictoryComponent';

export default function Game(): JSX.Element {
  const dispatch = useDispatch();

  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const mainPlayerAudioElement = useAudioElement();
  const gameId = useSelector((state: IReducers) => state.songDifficultyIndexReducer);
  const audioRef = useRef<HTMLAudioElement>(null);
  const preloaderDelay = 2000;
  const speedMultiplier = 0.4;
  const { ApproachRate, OverallDifficulty } = mapData.mapData[gameId].difficulty;
  const { hitObjects, timingPoints, colors } = mapData.mapData[gameId];
  const layerRef = useRef<Konva.Layer>(null);
  const gameElements = useUpdate(
    hitObjects,
    timingPoints,
    ApproachRate,
    OverallDifficulty,
    speedMultiplier,
    preloaderDelay
  );

  useEffect(() => {
    if (mainPlayerAudioElement) {
      mainPlayerAudioElement.pause();
    }
    if (audioRef.current) {
      audioRef.current.play();
    }

    return () => {
      dispatch(resetGameAction());
    };
  }, []);

  const [inGame, setInGame] = useState<boolean>(true);

  const onFinishGame = async () => {
    setInGame(() => false);
  };

  return (
    <div
      className="gameStage"
      style={
        { backgroundImage: `url(${mapData.images[0].imagesFile})` }
      }
    >
      <GameBar />
      {!inGame ? <VictoryComponent /> : null}

      <audio ref={audioRef} src={mapData.audio || audioPlug}>
        <track kind="captions" />
      </audio>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layerRef}>
          <Preloader animationTime={preloaderDelay} />
          <HitObjects
            objects={gameElements}
            colors={colors}
            audioRef={audioRef}
            layerRef={layerRef}
            onFinishGame={onFinishGame}
          />
        </Layer>
      </Stage>
    </div>
  );
}
