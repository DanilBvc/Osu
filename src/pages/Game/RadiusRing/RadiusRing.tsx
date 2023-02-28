import Konva from 'konva';
import React, { useEffect, useRef } from 'react';
import { Circle } from 'react-konva';

function RadiusRing(): JSX.Element {
  const radiusRef = useRef<Konva.Circle | null>(null);

  const startAnimationRadius = () => {
    if (radiusRef.current) {
      radiusRef.current.to({
        duration: 0.7,
        radius: 0,
        easing: Konva.Easings.Linear,
        onFinish: () => radiusRef.current?.destroy(),
      });
    }
  };

  useEffect(() => {
    startAnimationRadius();
  });

  return (
    <Circle
      ref={radiusRef}
      radius={150}
      strokeWidth={5}
      opacity={0.4}
      fill="black"
      stroke="red"
      blurRadius={10}
    />
  );
}

export default React.memo(RadiusRing);
