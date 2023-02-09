import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import parallaxCreate from '../../../utils/parallaxCreate';
import throttle from '../../../utils/throttle';
import './parallaxBackground.scss';

function ParallaxBacground() {
  const throttleInProgress = useRef(false);
  const backgroundSource = useSelector((state: IReducers) => state.backgroundSourceReducer);
  const backgroundElement = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      if (backgroundElement.current !== null) {
        throttle(() => parallaxCreate(event, backgroundElement.current), throttleInProgress, 25);
      }
    });
  }, []);

  return (
    <div
      className="select-map-page-container__background"
      style={{
        backgroundImage: `url(${backgroundSource})`,
      }}
      ref={backgroundElement}
    />
  );
}

export default ParallaxBacground;
