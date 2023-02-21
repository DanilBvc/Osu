import { Layer } from 'konva/lib/Layer';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Line } from 'react-konva';
import { IResultMessage, UpdatedObject } from '../../types/gameTypes';
import GameCircle from './Circle/Circle';
import ScoreText from './ScoreText/ScoreText';
import GameSlider from './Slider/Slider';
import Spinner from './Spinner/Spinner';

import ring from '../../assets/mesh/ring.png';
import ring2 from '../../assets/mesh/ring2.png';

interface IHitObjectsProps {
  objects: UpdatedObject[];
  audioRef: React.RefObject<HTMLAudioElement>;
  colors: number[][];
  layerRef: React.RefObject<Layer>;
}

export default function HitObjects({
  objects,
  audioRef,
  colors,
  layerRef,
}: IHitObjectsProps) {
  const [objectToRender, setObjectToRender] = useState<UpdatedObject[]>([]);
  const [resultsMessages, setResultsMessages] = useState<IResultMessage[]>([]);

  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);
      setObjectToRender(objects.filter(
        (i: UpdatedObject) => currentTime > i.time && currentTime < (i.animationTime + i.time)
      ));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', timeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', timeUpdate);
      }
    };
  }, []);

  const messageHandler = (result: IResultMessage) => {
    setResultsMessages(() => [{ ...result, id: window.crypto.randomUUID() }]);
  };

  const removeMessage = useCallback((id: string | undefined) => {
    setResultsMessages(resultsMessages.filter((message) => message.id !== id));
  }, []);

  return (
    <>
      {/* <Image image={ring2} /> */}
      {resultsMessages.map((message: IResultMessage) => (
        <ScoreText
          message={message}
          key={message.id}
          removeMessage={removeMessage}
        />
      ))}

      {objectToRender.map((object: UpdatedObject) => {
        if (object.type === 'slider') {
          return (
            <GameSlider
              key={object.unKey}
              model={object}
              colors={colors}
              layerRef={layerRef}
            />
          );
        }
        if (object.type === 'circle') {
          return (
            <GameCircle
              key={object.unKey}
              colors={colors}
              model={object}
              layerRef={layerRef}
              messageHandler={messageHandler}
            />
          );
        }
        return (
          <Spinner
            key={object.unKey}
            model={object}
            colors={colors}
            layerRef={layerRef}
          />
        );
      })}
    </>
  );
}
