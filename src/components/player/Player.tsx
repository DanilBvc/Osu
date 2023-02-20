/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import { useRef, useState } from 'react';
import './player.scss';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import IMapData from '../../types/mapsDataTypes/mapsDataTypes';
import { usePlayAudio, useAudioElement } from '../../contexts/audioContextWrapper';
import { setCurrentAudioSourceAction } from '../../store/reducers/selectMapPage/currentAudioSourceReducer';
import { setSongIDAction } from '../../store/reducers/selectMapPage/songIDReducer';
import { setBackgroundSourceAction } from '../../store/reducers/selectMapPage/backgroundSourceReducer';

export default function Player(): JSX.Element {
  const dispatch = useDispatch();
  const storeMapsData: IMapData[] = useSelector((state: IReducers) => state.mapsDataReducer);
  const playAudio = usePlayAudio();
  const audioElement = useAudioElement();
  const currentAudioSource = useSelector((state: IReducers) => state.currentAudioSourceReducer);
  const selectedSongID = useSelector((state: IReducers) => state.songIDReducer);
  const setSongID = (ID: string) => {
    dispatch(setSongIDAction(ID));
  };
  const setCurrentAudioSource = (audioSource: string) => {
    dispatch(setCurrentAudioSourceAction(audioSource));
  };
  const setBackgroundSource = (source: string) => {
    dispatch(setBackgroundSourceAction(source));
  };
  const trackIndex = useRef<number>(
    storeMapsData.findIndex((mapData) => mapData.id === selectedSongID) !== -1
      ? storeMapsData.findIndex((mapData) => mapData.id === selectedSongID)
      : 0
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(!audioElement?.paused);
  const nextSong = (): void => {
    trackIndex.current + 1 > storeMapsData.length - 1
      ? trackIndex.current = 0
      : trackIndex.current += 1;
    setIsPlaying(true);
    setSongID(storeMapsData[trackIndex.current].id as string);
    setCurrentAudioSource(storeMapsData[trackIndex.current].audio as string);
    setBackgroundSource(storeMapsData[trackIndex.current].images[0].imagesFile);
  };
  const prevSong = (): void => {
    trackIndex.current - 1 < 0
      ? trackIndex.current = storeMapsData.length - 1
      : trackIndex.current -= 1;
    setIsPlaying(true);
    setSongID(storeMapsData[trackIndex.current].id as string);
    setCurrentAudioSource(storeMapsData[trackIndex.current].audio as string);
    setBackgroundSource(storeMapsData[trackIndex.current].images[0].imagesFile);
  };
  const tooglePlayerState = (): void => {
    if (!playAudio) return;
    if (currentAudioSource !== storeMapsData[trackIndex.current].audio) {
      setCurrentAudioSource(storeMapsData[trackIndex.current].audio as string);
      setSongID(storeMapsData[trackIndex.current].id as string);
    }
    isPlaying ? audioElement?.pause() : audioElement?.play();
    setBackgroundSource(storeMapsData[trackIndex.current].images[0].imagesFile);
    setIsPlaying(!isPlaying);
  };
  const stopAndReload = (): void => {
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.pause();
    }
    setIsPlaying(false);
  };

  return (
    <div className="player">
      <div className="player-track-info">
        <p className="player-track-info__title">Current track</p>
        <span className="player-track-info__musical-note">♪</span>
        <p className="player-track-info__name">
          {
            storeMapsData[trackIndex.current]?.mapName
              ? `${storeMapsData[trackIndex.current]?.mapData[0].metadata.Artist} - ${storeMapsData[trackIndex.current]?.mapName}`
              : 'Loading track data...'
          }
        </p>
      </div>
      <div className="player__controls-wrapper">
        <div className="player__controls-headline">
          <div className="player-buttons">
            <button type="button" onClick={prevSong}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" /></svg>
            </button>
            <button onClick={tooglePlayerState} type="button">
              {' '}
              {
                !isPlaying
                  ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="white" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" /></svg>
              }
            </button>
            <button onClick={stopAndReload} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
            </button>
            <button type="button" onClick={nextSong}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" /></svg>
            </button>
          </div>
          <VolumeBar audioElement={audioElement} />
        </div>
        <ProgressBar audioElement={audioElement} />
      </div>
    </div>
  );
}
