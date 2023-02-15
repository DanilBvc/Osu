import { useState } from 'react';
import { higherSpeakerIcon, lowerSpeakerIcon } from '../../assets/playersIcons/icons';
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
    <div className="volume-bar-wrapper">
      <img className="volume-bar__lower-speaker-icon" src={lowerSpeakerIcon} alt="lower-speaker" />
      <input
        type="range"
        className="volume-bar__input"
        value={volume}
        min={0}
        max={1}
        step={0.01}
        onChange={changeVolume}
      />
      <img className="volume-bar__higher-speaker-icon" src={higherSpeakerIcon} alt="higher-speaker" />
    </div>
  );
}
