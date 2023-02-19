/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { Link, Navigate } from 'react-router-dom';
import getNewsDataFromApi from '../../../utils/api/getNewsDataFromApi';
import { INewsData } from '../../../types/mapsDataTypes/mapsDataFromApiTypes';
import { Result, fetchMapPreview } from '../../../utils/api/fetchMapPreview';
import AddMapBlock from '../addMapMain/addMapBlock/AddMapBlock';

function AddMapNews() {
  const [newsData, setNewsData] = useState<INewsData[] | []>([]);
  const [randomMapsData, setRandomMapsData] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [counter, setCounter] = useState(0);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioStatusRef = useRef(false);
  const handleAudio = (audio: string) => {
    const audioElement = new Audio(audio);
    if (audioStatusRef.current) {
      audioElementRef.current?.pause();
    }
    audioStatusRef.current = true;
    audioElementRef.current = audioElement;
    audioElement.play();
  };
  const handleLoadingMap = (value: boolean) => {
    setLoadingMap(value);
  };
  const handleRandom = () => {
    setLoading(true);
    setCounter(counter + 1);
  };
  useEffect(() => {
    getNewsDataFromApi().then((data) => setNewsData(data));
  }, []);
  useEffect(() => {
    fetchMapPreview(4, 'random').then((r) => {
      setLoading(r.loading);
      setRandomMapsData(r.result);
    });
  }, [counter]);
  return (
    <div className="news-container">
      <div className="news-wrapper">
        <div className="news-title">What happens</div>
        <div className="news-content">
          <div className="news-content-up">
            <div className="news-content-up-item">player</div>
            <div className="news-content-up-item">song</div>
            <div className="news-content-up-item">combo</div>
            <div className="news-content-up-item">grade</div>
            <div className="news-content-up-item">accurency</div>
            <div className="news-content-up-item">time</div>
          </div>
          <div className="news-content-down">
            {newsData.reverse().map((item) => (
              <div className="news-content-down-item" key={uuid()}>
                <div className="news-content-down-player">
                  {item.ip}
                </div>
                <Link className="news-content-down-song" to="popular" state={{ input: item.title }}>
                  {item.title}
                </Link>
                <div className="news-content-down-combo">
                  {item.combo}
                  x
                </div>
                <div className="news-content-down-grade">
                  {item.grade}
                </div>
                <div className="news-content-down-accurency">
                  {item.acc}
                </div>
                <div className="news-content-down-time">
                  {new Date(+item.time).getHours()}
                  :
                  {new Date(+item.time).getMinutes() < 10 ? `${new Date(+item.time).getMinutes()}0` : new Date(+item.time).getMinutes()}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="news-random-maps-wrapper">
          <div className="news-title-wrapper">
            <div className="news-random-title">Random maps</div>
            <button type="submit" className="random-btn" onClick={() => { handleRandom(); }}>random</button>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="loading-ball">
                <div className="ball one"></div>
                <div className="ball two"></div>
                <div className="ball three"></div>
                <div className="ball four"></div>
              </div>
            </div>
          ) : (
            <div className="news-random-content">
              {randomMapsData.map((item) => (
                <AddMapBlock
                  handleAudio={handleAudio}
                  handleLoadingMap={handleLoadingMap}
                  loadingMap={loadingMap}
                  key={item.id}
                  img={item.images}
                  audio={item.audio}
                  beat={item.beatMapInfo}
                />
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default AddMapNews;
