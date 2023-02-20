/* eslint-disable max-len */
import { useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSelector } from 'react-redux';
import GameCircle from './Circle/Circle';
import GameSlider from './Slider/Slider';
import Spinner from './Spinner/Spinner';
import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import audioPlug from '../../assets/plugs/audio-plug.mp3';
import useUpdate from '../../customHooks/useUpdate';
import { UpdatedObject } from '../../types/gameTypes';
import GameBar from './GameBar/GameBar';
import { useAudioElement } from '../../contexts/audioContextWrapper';

function Game(): JSX.Element {
  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const mainPlayerAudioElement = useAudioElement();
  const {
    ApproachRate,
    OverallDifficulty,
    SliderMultiplier,
    SliderTickRate,
  } = mapData.mapData[0].difficulty;
  const { hitObjects, timingPoints, colors } = mapData.mapData[0];
  const gameElements = useUpdate(hitObjects, timingPoints, ApproachRate, OverallDifficulty, 0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (mainPlayerAudioElement) mainPlayerAudioElement.pause();
    if (audioRef.current) audioRef.current.play();
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
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {gameElements.map((object: UpdatedObject) => {
            if (object.type === 'slider') {
              return (
                <GameSlider
                  key={object.unKey}
                  model={object}
                  colors={colors}
                  audioRef={audioRef}
                />
              );
            }
            if (object.type === 'circle') {
              return (
                <GameCircle
                  key={object.unKey}
                  colors={colors}
                  model={object}
                  audioRef={audioRef}
                />
              );
            }
            return (
              <Spinner
                key={window.crypto.randomUUID()}
                model={object}
                colors={colors}
                audioRef={audioRef}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>

  );
}

export default Game;
