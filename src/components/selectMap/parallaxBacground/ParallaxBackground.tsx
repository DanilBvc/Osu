import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import parallaxCreate from '../../../utils/parallaxCreate';
import throttle from '../../../utils/throttle';
import './parallaxBackground.scss';

function ParallaxBacground() {
  const throttleInProgress = useRef(false);
  const backgroundSource = useSelector((state: IReducers) => state.backgroundSourceReducer);

  useEffect(() => {
    const background = document.querySelector('.select-map-page-container__background') as HTMLDivElement;

    document.addEventListener('mousemove', (event) => {
      throttle(() => parallaxCreate(event, background), throttleInProgress, 25);
    });
  }, []);

  return (
    <div
      className="select-map-page-container__background"
      style={{
        backgroundImage: `url(${backgroundSource})`,
      }}
    />
  );
}

export default ParallaxBacground;
