import { useState } from 'react';
import { PlayerBarsProps } from '../../types/mainPageTypes/mainPageTypes';

export default function ProgressBar({ audioElement }: PlayerBarsProps) {
  const [progress, setProgress] = useState<string>('0');
  if (!audioElement) return (<span>No current audio</span>);
  const activeSong = audioElement;
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
      value={Number.isNaN(Number(progress)) ? '0' : progress}
      min={0}
      max={100}
      step={1}
      onChange={changeProgress}
    />
  );
}
