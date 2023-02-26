/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { Link, Navigate } from 'react-router-dom';
import { INewsData } from '../../../types/mapsDataTypes/mapsDataFromApiTypes';
import { Result, fetchMapPreview } from '../../../utils/api/fetchMapPreview';
import AddMapBlock from '../addMapMain/addMapBlock/AddMapBlock';

function AddMapNews() {
  const [randomMapsData, setRandomMapsData] = useState<Result[] | []>([]);
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
    fetchMapPreview(10, 'random').then((r) => {
      setLoading(r.loading);
      if (r.result === null) {
        setRandomMapsData([]);
      } else {
        setRandomMapsData(r.result);
      }
    });
  }, [counter]);
  return (
    <div className="news-container">
      <div className="news-wrapper">

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
              {randomMapsData.length === 0 ? <div>Error</div> : (
                <>
                  {
                    randomMapsData.map((item) => (
                      <AddMapBlock
                        handleAudio={handleAudio}
                        handleLoadingMap={handleLoadingMap}
                        loadingMap={loadingMap}
                        key={item.id}
                        img={item.images}
                        audio={item.audio}
                        beat={item.beatMapInfo}
                      />
                    ))
                  }
                </>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default AddMapNews;
