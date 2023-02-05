import { useState } from 'react';
import { PlayerBarsProps } from './ProgressBar';

export default function VolumeBar({ audioPlayer }: PlayerBarsProps): JSX.Element {
  const [volume, setVolume] = useState<number>(0.3);
  const activeSong: HTMLAudioElement = audioPlayer;

  const changeVolume = (e: { target: HTMLInputElement }): void => {
    const { value } = e.target;
    setVolume(parseFloat(value));
    activeSong.volume = volume;
  };

  return (
    <input
      type="range"
      className="volume-bar"
      value={volume}
      min={0}
      max={1}
      step={0.01}
      onChange={changeVolume}
    />
  );
}
