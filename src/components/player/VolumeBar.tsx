/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { higherSpeakerIcon, lowerSpeakerIcon } from '../../assets/playersIcons/icons';
import { PlayerBarsProps } from '../../types/mainPageTypes/mainPageTypes';

export default function VolumeBar({ audioElement }: PlayerBarsProps): JSX.Element {
  if (!audioElement) return (<span>No current audio</span>);

  const activeSong: HTMLAudioElement = audioElement;
  const [volume, setVolume] = useState<number>(activeSong.volume);
  const changeVolume = (e: { target: HTMLInputElement }): void => {
    const { value } = e.target;
    setVolume(parseFloat(value));
    activeSong.volume = volume;
  };

  useEffect(() => {
    if (activeSong) {
      activeSong.volume = volume;
    }
  }, [volume, activeSong]);

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
