/* eslint-disable no-use-before-define */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  useAudioAanalyser, useAudioElement, usePlayAudio
} from '../../../contexts/audioContextWrapper';
import IReducers from '../../../types/reducers/reducersType';
import './osuButtonStyles.scss';

function OsuButton() {
  const animationID = useRef(0);
  const osuButton = useRef(null);
  const playAudio = usePlayAudio();
  const audioAnalyser = useAudioAanalyser();
  const audioElement = useAudioElement();
  let frequencyData = null;
  const currentAudioSource = useSelector((state: IReducers) => state.currentAudioSourceReducer);

  useEffect(() => {
    if (!audioElement) return;
    audioElement.addEventListener('pause', () => {
      if (osuButton.current !== null) {
        (osuButton.current as HTMLElement).classList.add('pulse-animation');
      }
    });
  }, []);

  useEffect(() => {
    if (!currentAudioSource || !playAudio) return;
    playAudio(currentAudioSource);
  }, [currentAudioSource]);

  useEffect(() => {
    if (audioAnalyser && !animationID.current) {
      buttonAnimation(audioAnalyser);
    }
  }, [audioAnalyser]);

  function buttonAnimation(analyser: AnalyserNode) {
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    if (osuButton.current !== null) {
      const frequencyIndex = 40;
      const frequencyValueReduce = 750;
      const buttonScaleCoefficient = frequencyData[frequencyIndex] / frequencyValueReduce;

      if (!audioElement?.paused) {
        (osuButton.current as HTMLElement).classList.remove('pulse-animation');
      }
      (osuButton.current as HTMLElement).style.transform = `scale(${1 + buttonScaleCoefficient})`;
    }
    animationID.current = window.requestAnimationFrame(buttonAnimation.bind(undefined, analyser));
  }

  return (
    <div
      className="osu-button pulse-animation"
      ref={osuButton}
    >
      <span className="osu-button__title">osu!</span>
    </div>
  );
}

export default OsuButton;
