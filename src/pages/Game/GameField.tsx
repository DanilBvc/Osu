/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
import { useEffect, useRef, useState } from 'react';
import { Data, HitObjects } from '../../types/mapsDataTypes/osuDataTypes';
import Curve from './Curve';

interface GameFieldProps {
  game: Data;
  audio: string;
}

export default function GameField({ game, audio }: GameFieldProps): JSX.Element {
  const {
    colors, hitObjects, timingPoints, difficulty,
  } = game;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAudioTime, setCurrentAudioTIme] = useState<number>(0);
  const [objectsToRender, setObjectsToRender] = useState<HitObjects[] | null>(null);

  const lifeTime = 5555;

  useEffect(() => {
    const render = hitObjects.filter((obj: HitObjects) => currentAudioTime > obj.time && obj.time + lifeTime > currentAudioTime);

    setObjectsToRender(() => render);
  }, [currentAudioTime]);

  const timeUpdate = () => {
    if (audioRef.current) setCurrentAudioTIme(+(audioRef.current?.currentTime * 1000).toFixed(0));
  };

  return (
    <>
      <button type="button" onClick={() => audioRef.current?.play()}>play</button>
      <button type="button" onClick={() => audioRef.current?.load()}>load</button>
      <audio onTimeUpdate={timeUpdate} ref={audioRef} src={audio}>
        <track kind="captions" />
      </audio>
      <svg width="100%" height="100vh" xmlns="http://www.w3.org/2000/svg">

        {objectsToRender?.map(
          (obj) => <Curve hitObjects={obj} colors={colors} key={window.crypto.randomUUID()} />
        )}

      </svg>
    </>

  );
}
