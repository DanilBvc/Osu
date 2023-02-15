/* eslint-disable no-unused-expressions */
import {
  useEffect, useMemo, useState
} from 'react';
import './player.scss';
import { useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import IMapData from '../../types/mapsDataTypes/mapsDataTypes';

export default function Player(): JSX.Element {
  const playList: IMapData[] = useSelector((state: IReducers) => state.mapsDataReducer);
  const audioPlayer = useMemo((): HTMLAudioElement => new Audio(''), []);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const nextSong = (): void => {
    trackIndex + 1 > playList.length - 1 ? setTrackIndex(0) : setTrackIndex((s) => s + 1);
  };

  const prevSong = (): void => {
    trackIndex - 1 < 0 ? setTrackIndex(playList.length - 1) : setTrackIndex((s) => s - 1);
  };

  const tooglePlayerState = (): void => {
    isPlaying ? audioPlayer.pause() : audioPlayer.play();
    setIsPlaying(!isPlaying);
  };

  const stopAndReload = (): void => {
    audioPlayer.load();
    setIsPlaying(false);
  };

  useEffect((): void => {
    if (playList[trackIndex]) {
      audioPlayer.src = playList[trackIndex].audio as string;
      audioPlayer.play();
      setIsPlaying(true);
    }
  }, [trackIndex]);

  useEffect((): void => {
    if (playList[trackIndex]?.audio) {
      audioPlayer.src = playList[trackIndex].audio as string;
    }
  }, [playList.length]);

  return (
    <div className="player">
      <div className="player-track-info">
        <p className="player-track-info__title">Current track</p>
        <span className="player-track-info__musical-note">♪</span>
        <p className="player-track-info__name">
          {
            playList[trackIndex]?.mapName
              ? `${playList[trackIndex]?.mapData[0].metadata.Artist} - ${playList[trackIndex]?.mapName}`
              : 'No existing tracks'
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
          <VolumeBar audioPlayer={audioPlayer} />
        </div>
        <ProgressBar audioPlayer={audioPlayer} />
      </div>
    </div>
  );
}
