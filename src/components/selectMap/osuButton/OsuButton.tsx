/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IOsuButton } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './osuButtonStyles.scss';

function OsuButton(props: IOsuButton) {
  const { path, currentPageAudio } = props;
  let context = null;
  let audioAanalyser: null | AnalyserNode = null;
  let audioSource = null;
  let frequencyData = null;
  let osuButton: null | HTMLLinkElement = null;

  useEffect(() => {
    audioContextBind();
  }, [currentPageAudio]);

  function audioContextBind() {
    context = new AudioContext();
    audioAanalyser = context.createAnalyser();
    audioSource = context.createMediaElementSource(currentPageAudio);
    audioSource.connect(audioAanalyser);
    audioAanalyser.connect(context.destination);
    buttonAnimation();
  }

  function buttonAnimation() {
    window.requestAnimationFrame(buttonAnimation);
    frequencyData = new Uint8Array((audioAanalyser as AnalyserNode).frequencyBinCount);
    (audioAanalyser as AnalyserNode).getByteFrequencyData(frequencyData);
    osuButton = document.querySelector('.osu-button');
    if (osuButton !== null) {
      const frequencyIndex = 40;
      const frequencyValueReduce = 750;
      const buttonScaleCoefficient = frequencyData[frequencyIndex] / frequencyValueReduce;

      osuButton.style.transform = `scale(${1 + buttonScaleCoefficient})`;
    }
  }

  return (
    <Link className="osu-button" to={path}>
      <span className="osu-button__title">osu!</span>
    </Link>
  );
}

export default OsuButton;
