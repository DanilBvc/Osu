import { useEffect, useRef, useState } from 'react';
import { Data, HitObjects } from '../../types/mapsDataTypes/osuDataTypes';
import Curve from './Curve';

interface GameFieldProps {
  game: Data;
  audio: string;
}

export default function GameField({ game, audio }: GameFieldProps): JSX.Element {
  const { colors, hitObjects, timingPoints } = game;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAudioTime, setCurrentAudioTIme] = useState<number>(0);
  const [timePointIndex, setTimePointIndex] = useState<number>(0);

  const timeUpdate = () => {
    if (audioRef.current) setCurrentAudioTIme(+String(audioRef.current.currentTime).slice(0, 5).replace('.', ''));
  };
  const [Objects, setObjects] = useState<HitObjects[]>([hitObjects[0]]);

  useEffect(() => {
    const actualObjects = hitObjects.filter(
      (object: HitObjects) => object.time < timingPoints[timePointIndex].offset
        && object.time > currentAudioTime
    );
    setObjects(() => actualObjects);
  }, [currentAudioTime]);

  return (
    <>
      <button type="button" onClick={() => audioRef.current?.play()}>play</button>
      <button type="button" onClick={() => audioRef.current?.load()}>load</button>
      <audio onTimeUpdate={timeUpdate} ref={audioRef} src={audio}>
        <track kind="captions" />
      </audio>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

        {Objects?.map(
          (obj) => <Curve hitObjects={obj} colors={colors} key={window.crypto.randomUUID()} />
        )}

      </svg>
    </>

  );
}
