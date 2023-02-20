/* eslint-disable max-len */
import { useRef, useEffect } from 'react';
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

export default function Game(): JSX.Element {
  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const mainPlayerAudioElement = useAudioElement();
  const gameId = useSelector((state: IReducers) => state.songDifficultyIndexReducer);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { ApproachRate, OverallDifficulty } = mapData.mapData[gameId].difficulty;
  const { hitObjects, timingPoints, colors } = mapData.mapData[gameId];
  const dispatch = useDispatch();
  dispatch(resetGameAction());
  const layerRef = useRef<Konva.Layer>(null);
  const gameElements = useUpdate(hitObjects, timingPoints, ApproachRate, OverallDifficulty, 0.5);

  useEffect(() => {
    if (mainPlayerAudioElement) {
      mainPlayerAudioElement.pause();
    }
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div
      className="gameStage"
      style={
        { backgroundImage: `url(${mapData.images[0].imagesFile})` }
      }
    >
      <GameBar />

      <audio ref={audioRef} src={mapData.audio || audioPlug}>
        <track kind="captions" />
      </audio>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={layerRef}>
          {/* <Preloader /> */}
          <HitObjects objects={gameElements} colors={colors} audioRef={audioRef} layerRef={layerRef} />
        </Layer>
      </Stage>
    </div>
  );
}
