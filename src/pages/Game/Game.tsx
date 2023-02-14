import { useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSelector } from 'react-redux';
import GameCircle from './Circle/Circle';
import GameSlider from './Slider/Slider';
import useUpdatedObjects from '../../customHooks/useUpdatedObjects';
import Spinner from './Spinner/Spinner';
import IReducers from '../../types/reducers/reducersType';
import './game.scss';
import { UpdatedObject } from '../../types/gameTypes';

function Game() {
  const mapData = useSelector((state: IReducers) => state.activeGameReduccer);
  const { colors } = mapData.mapData[0];
  const audioRef = useRef<HTMLAudioElement>(null);
  const OBJECTS = useUpdatedObjects(mapData.mapData[0]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.play();
  }, []);

  return (
    <div
      className="gameStage"
      style={
        { backgroundImage: `url(${mapData.images[0].imagesFile})` }
      }
    >
      <audio ref={audioRef} src={mapData.audio ?? ''}>
        <track kind="captions" />
      </audio>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {OBJECTS.slice(0, 100).map((object: UpdatedObject) => {
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
                spinner={object}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>

  );
}

export default Game;
