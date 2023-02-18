/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAudioAanalyser, useAudioContext, usePlayAudio } from '../../../contexts/audioContextWrapper';
import IReducers from '../../../types/reducers/reducersType';
import './osuButtonStyles.scss';

function OsuButton() {
  const dispatch = useDispatch();
  const [oseButtonHover, setOsuButtonHover] = useState(false);
  const animationID = useRef(0);
  const osuButton = useRef(null);
  const playAudio = usePlayAudio();
  const audioAnalyser = useAudioAanalyser();
  let frequencyData = null;
  const currentAudioSource = useSelector((state: IReducers) => state.currentAudioSourceReducer);

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

      if (!oseButtonHover) {
        (osuButton.current as HTMLElement).style.transform = `scale(${1 + buttonScaleCoefficient})`;
      }
    }
    if (!oseButtonHover) {
      animationID.current = window.requestAnimationFrame(buttonAnimation.bind(undefined, analyser));
    }
  }

  return (
    <div
      className="osu-button"
      ref={osuButton}

      // TODO: disable animation on button hover
      // onMouseEnter={() => {
      //   setOsuButtonHover(true);
      //   cancelAnimationFrame(animationID.current);
      // }}
      // onMouseLeave={() => {
      //   setOsuButtonHover(false);
      // }}
    >
      <span className="osu-button__title">osu!</span>
    </div>
  );
}

export default OsuButton;
