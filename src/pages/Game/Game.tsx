/* eslint-disable max-len */
import { useRef, useEffect } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
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

export default function Game(): JSX.Element {
  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { ApproachRate, OverallDifficulty } = mapData.mapData[0].difficulty;
  const { hitObjects, timingPoints, colors } = mapData.mapData[0];
  const dispath = useDispatch();
  dispath(resetGameAction());
  const layerRef = useRef<Konva.Layer>(null);
  const gameElements = useUpdate(hitObjects, timingPoints, ApproachRate, OverallDifficulty, 0.5);

  useEffect(() => {
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

// const star = new Konva.Star({
//   x: 500,
//   y: 500,
//   numPoints: 5,
//   innerRadius: 10,
//   outerRadius: 20,
//   fill: 'red',
// });

// const starRef = useRef(star);

// const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
//   const { clientX, clientY } = e.evt;

//   // star.x(clientX - 10);
//   // star.y(clientY - 10);
//   // mouseCircle.x(clientX);
//   // mouseCircle.y(clientY);
// };

// useEffect(() => {
//   const animation = new Konva.Animation((frame: any) => {
//     if (starRef.current) {
//       const x = frame.time * 0.01 % window.innerWidth;
//       const y = frame.time * 0.01 % window.innerHeight;
//       starRef.current.x(x);
//       starRef.current.y(y);
//     }
//   }, starRef.current?.getLayer());

//   animation.start();

//   return () => {
//     animation.stop();
//   };
// }, []);
