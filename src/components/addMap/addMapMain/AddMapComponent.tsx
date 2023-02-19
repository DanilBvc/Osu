/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../../../customHooks/useInfiniteScroll';
import { Result, fetchMapPreview } from '../../../utils/api/fetchMapPreview';
import AddMapBlock from './addMapBlock/AddMapBlock';

interface IProps {
  input: string;
}

function AddMapComponent({ input }: IProps) {
  const count = useInfiniteScroll();
  const [classification, setClassification] = useState(1);
  const [language, setLanguage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState(false);
  const [data, setData] = useState<Result[]>([]);
  const location = useLocation();
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioStatusRef = useRef(false);
  const splittedRoute = location.pathname.split('/');
  const currentRoute = splittedRoute[splittedRoute.length - 1];
  const handleLoadingMap = (value: boolean) => {
    setLoadingMap(value);
  };
  useEffect(() => {
    setLoading(true);
    fetchMapPreview(count, `${currentRoute}`, { classification, language, search: input }).then((r) => {
      setLoading(r.loading);
      setData(r.result);
    });
  }, [location, language, classification, input]);
  useEffect(() => {
    fetchMapPreview(count, `${currentRoute}`, { classification, language, search: input }).then((r) => {
      setLoading(r.loading);
      setData(r.result);
    });
  }, [count]);
  const handleAudio = (audio: string) => {
    const audioElement = new Audio(audio);
    if (audioStatusRef.current) {
      audioElementRef.current?.pause();
    }
    audioStatusRef.current = true;
    audioElementRef.current = audioElement;
    audioElement.play();
  };
  return (
    <>
      {!loading
        ? (
          <>
            {currentRoute === 'classification' ? (
              <div className="classification-wrapper">
                <div className="classification-style">
                  <div>Style:</div>
                  <div className={`select-style ${classification === 1 ? 'active' : ''}`} onClick={() => { setClassification(1); }}>Any</div>
                  <div className={`select-style ${classification === 4 ? 'active' : ''}`} onClick={() => { setClassification(4); }}>Video games</div>
                  <div className={`select-style ${classification === 8 ? 'active' : ''}`} onClick={() => { setClassification(8); }}>Anime</div>
                  <div className={`select-style ${classification === 16 ? 'active' : ''}`} onClick={() => { setClassification(16); }}>Rock n roll</div>
                  <div className={`select-style ${classification === 32 ? 'active' : ''}`} onClick={() => { setClassification(32); }}>Pop</div>
                  <div className={`select-style ${classification === 64 ? 'active' : ''}`} onClick={() => { setClassification(64); }}>Another</div>
                  <div className={`select-style ${classification === 128 ? 'active' : ''}`} onClick={() => { setClassification(128); }}>Novelties</div>
                  <div className={`select-style ${classification === 256 ? 'active' : ''}`} onClick={() => { setClassification(256); }}>Hip-hop</div>
                </div>
                <div className="classification-language">
                  <div>Language:</div>
                  <div className={`select-language ${language === 1 ? 'active' : ''}`} onClick={() => { setLanguage(1); }}>Any</div>
                  <div className={`select-language ${language === 4 ? 'active' : ''}`} onClick={() => { setLanguage(4); }}>English</div>
                  <div className={`select-language ${language === 8 ? 'active' : ''}`} onClick={() => { setLanguage(8); }}>Japanese</div>
                  <div className={`select-language ${language === 16 ? 'active' : ''}`} onClick={() => { setLanguage(16); }}>Chinese</div>
                  <div className={`select-language ${language === 64 ? 'active' : ''}`} onClick={() => { setLanguage(64); }}>Korean</div>
                  <div className={`select-language ${language === 128 ? 'active' : ''}`} onClick={() => { setLanguage(128); }}>French</div>
                  <div className={`select-language ${language === 256 ? 'active' : ''}`} onClick={() => { setLanguage(256); }}>German</div>
                  <div className={`select-language ${language === 512 ? 'active' : ''}`} onClick={() => { setLanguage(512); }}>Swedish</div>
                  <div className={`select-language ${language === 1024 ? 'active' : ''}`} onClick={() => { setLanguage(1024); }}>Spanish</div>
                  <div className={`select-language ${language === 2048 ? 'active' : ''}`} onClick={() => { setLanguage(2048); }}>Italian</div>
                </div>
              </div>
            ) : null}
            <div className="addMapComponent-wrapper">
              {data.map((map) => (
                <AddMapBlock
                  handleAudio={handleAudio}
                  handleLoadingMap={handleLoadingMap}
                  loadingMap={loadingMap}
                  key={map.id}
                  img={map.images}
                  audio={map.audio}
                  beat={map.beatMapInfo}
                />
              ))}
              {data.length === 0 ? <div className="nothing">Nothing found</div> : null}
            </div>
          </>
        )
        : (
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
    </>
  );
}

export default AddMapComponent;
