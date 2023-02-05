import { useState } from 'react';

export interface PlayerBarsProps {
  audioPlayer: HTMLAudioElement;
}

export default function ProgressBar({ audioPlayer }: PlayerBarsProps) {
  const [progress, setProgress] = useState<string>('0');
  const activeSong = audioPlayer;
  const { duration, currentTime } = activeSong;

  const changeProgress = (e: { target: HTMLInputElement }): void => {
    const { value } = e.target;
    activeSong.currentTime = (duration / 100) * parseInt(value, 10);
    setProgress(value);
  };

  const updateProgress = (): void => {
    const progressPercent = (currentTime / duration) * 100;
    setProgress(`${progressPercent}`);
  };

  activeSong.addEventListener('timeupdate', updateProgress);

  return (
    <input
      type="range"
      className="progress-bar"
      value={progress}
      min={0}
      max={100}
      step={1}
      onChange={changeProgress}
    />
  );
}
