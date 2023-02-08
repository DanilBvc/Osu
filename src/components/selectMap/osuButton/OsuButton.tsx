/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IReducers from '../../../types/reducers/reducersType';
import { IOsuButton } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import './osuButtonStyles.scss';

function OsuButton(props: IOsuButton) {
  const { path } = props;
  let context: null | AudioContext = null;
  let audioAanalyser: null | AnalyserNode = null;
  let audioSource: null | MediaElementAudioSourceNode = null;
  let frequencyData = null;
  let osuButton: null | HTMLLinkElement = null;
  const currentAudioElement = useSelector((state: IReducers) => state.currentAudioReducer.at(-1));

  useEffect(() => {
    audioContextBind();
  }, []);

  function audioContextBind() {
    context = new AudioContext();
    audioAanalyser = context.createAnalyser();
    audioSource = context.createMediaElementSource(currentAudioElement as HTMLAudioElement);
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
