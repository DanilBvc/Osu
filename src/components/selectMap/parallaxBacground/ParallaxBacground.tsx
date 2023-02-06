import React, { useEffect, useRef } from 'react';
import { IParallaxBacground } from '../../../types/selectMapPageTypes/selectMapPageTypes';
import parallaxCreate from '../../../utils/parallaxCreate';
import throttle from '../../../utils/throttle';
import './parallaxBacground.scss';

function ParallaxBacground(props: IParallaxBacground) {
  const { backgroundSource } = props;
  const throttleInProgress = useRef(false);

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
