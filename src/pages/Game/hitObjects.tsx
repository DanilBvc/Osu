/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Layer } from 'konva/lib/Layer';
import React, {
  useCallback, useEffect, useState
} from 'react';
import { IResultMessage, UpdatedObject } from '../../types/gameTypes';
import GameCircle from './Circle/Circle';
import ScoreText from './ScoreText/ScoreText';
import GameSlider from './Slider/Slider';
import { defaultSounds } from '../../constants/constants';

interface IHitObjectsProps {
  objects: UpdatedObject[];
  audioRef: React.RefObject<HTMLAudioElement>;
  colors: number[][];
  layerRef: React.RefObject<Layer>;
  onFinishGame: () => void;
}

export default function HitObjects({
  objects,
  audioRef,
  colors,
  layerRef,
  onFinishGame,
}: IHitObjectsProps) {
  const [objectToRender, setObjectToRender] = useState<UpdatedObject[]>([]);
  const [resultsMessages, setResultsMessages] = useState<IResultMessage[]>([]);
  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);
      setObjectToRender(objects.filter((i: UpdatedObject) => currentTime > i.fadeInTime));
    }
  };
  const handleHitSound = (soundIndex: number) => {
    new Audio(defaultSounds[soundIndex]).play();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', timeUpdate);
      audioRef.current.addEventListener('ended', onFinishGame);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', timeUpdate);
        audioRef.current.removeEventListener('ended', onFinishGame);
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

      {
        resultsMessages.map((message: IResultMessage) => (
          <ScoreText
            message={message}
            key={message.id}
            removeMessage={removeMessage}
          />
        ))
      }
      {
        objectToRender.map((object: UpdatedObject) => {
          if (object.type === 'slider') {
            return (
              <GameSlider
                handleHitSound={handleHitSound}
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
                handleHitSound={handleHitSound}
                key={object.unKey}
                colors={colors}
                model={object}
                layerRef={layerRef}
                messageHandler={messageHandler}
              />
            );
          }
        })
      }

    </>
  );
}
