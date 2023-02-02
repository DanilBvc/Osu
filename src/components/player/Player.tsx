import { useRef, useState } from 'react';
import './player.scss';
import audioPlug from '../../assets/plugs/audio-plug.mp3';

import {
  nextIcon,
  prevIcon,
  playIcon,
  stopIcon,
  pauseIcon
} from '../../assets/playersIcons/icons';

export default function Player() {
  const [progress, setProgress] = useState<string>('0');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioPlayer = audioRef.current as HTMLAudioElement;

  const tooglePlayerState = (): void => {
    if (isPlaying) audioPlayer?.pause();
    else audioPlayer?.play();
    setIsPlaying((s) => !s);
  };

  const stopAndReload = (): void => {
    audioPlayer.load();
    setProgress('0');
    setIsPlaying(false);
  };

  const updateProgress = (): void => {
    const { duration, currentTime } = audioPlayer;

    if (currentTime && duration) {
      const progressPercent = (currentTime / duration) * 100;
      setProgress(`${progressPercent}`);
    }
  };

  const changeProgress = (e: { target: HTMLInputElement }): void => {
    const { value } = e.target;

    if (audioPlayer) {
      audioPlayer.currentTime = (audioPlayer.duration / 100) * parseInt(value, 10);
      setProgress(value);
    }
  };

  return (
    <div className="player">
      <audio
        src={audioPlug}
        preload="auto"
        ref={audioRef}
        onTimeUpdate={updateProgress}
      >
        <track kind="captions" />
      </audio>

      <p className="player-trackname"> Track name -  here</p>

      <div className="player-controls">

        <button type="button">
          <img src={prevIcon} alt="prev" />
        </button>

        <button onClick={tooglePlayerState} type="button">
          {' '}
          <img src={isPlaying ? pauseIcon : playIcon} alt="play" />
        </button>

        <button onClick={stopAndReload} type="button">
          <img src={stopIcon} alt="stop" />
        </button>

        <button type="button">
          <img src={nextIcon} alt="prev" />
        </button>

      </div>

      <input
        type="range"
        className="progress-bar"
        value={progress}
        min={0}
        max={100}
        step={1}
        onChange={changeProgress}
      />
    </div>
  );
}
