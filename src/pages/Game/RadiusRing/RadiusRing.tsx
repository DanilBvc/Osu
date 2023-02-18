import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Circle } from 'react-konva';
import { IRadiusRingProps } from '../../../types/gameTypes';

export default function RadiusRing({
  x,
  y,
  visible,
}: IRadiusRingProps): JSX.Element {
  const radiusRef = useRef<Konva.Circle | null>(null);

  const startAnimationRadius = () => {
    if (radiusRef.current) {
      radiusRef.current.to({
        duration: 0.7,
        radius: 30,
        easing: Konva.Easings.Linear,
        onFinish: () => radiusRef.current?.destroy(),
      });
    }
  };

  useEffect(() => {
    if (visible) startAnimationRadius();
  }, [visible]);

  return (
    <Circle
      ref={radiusRef}
      radius={100}
      x={x}
      y={y}
      stroke="red"
      blurRadius={10}
    />
  );
}
