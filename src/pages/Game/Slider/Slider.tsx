import {
  useCallback, useEffect, useRef, useState
} from 'react';
import { Group, Line, Circle } from 'react-konva';
import Konva from 'konva';
import { IGameElement } from '../../../types/gameTypes';
import { handleCursor } from '../../../utils/gameCursorHandler';

export default function GameSlider({
  colors,
  model,
  audioRef,
}: IGameElement) {
  const startPoint = { x: model.x, y: model.y };
  const bezierPoints = [startPoint, ...model.keyframes!];
  const circleRef = useRef<Konva.Circle | null>(null);
  const groupRef = useRef<Konva.Group | null>(null);
  const radiusRef = useRef<Konva.Circle | null>(null);
  const [ballColor, ballColor2, trackColor, borderColor] = colors;
  const [visible, setVisible] = useState(false);

  const lifeTime = 2000; // хардкод
  const duration = 2; // хардкод

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

  const startAnimationHandler = useCallback(() => {
    const startAnimationBall = (points = bezierPoints, index = 0) => {
      if (points.length === index && groupRef.current) {
        groupRef.current.destroy();
        return;
      }
      if (circleRef.current) {
        circleRef.current.to({
          x: points[index].x,
          y: points[index].y,
          duration: duration / points.length,
          easing: Konva.Easings.Linear,
          onFinish: () => startAnimationBall(points, index + 1),
        });
      }
    };

    return startAnimationBall;
  }, []);

  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);

      if (currentTime > model.time && currentTime < model.time + lifeTime) {
        setVisible(true);
        startAnimationHandler()();
        startAnimationRadius();
        audioRef.current?.removeEventListener('timeupdate', timeUpdate);
      } else setVisible(false);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', timeUpdate);
  }, []);

  return (
    <Group ref={groupRef} visible={visible}>
      <Line
        points={bezierPoints.flatMap(({ x, y }) => [x, y])}
        lineCap="round"
        stroke={`rgb(${borderColor.join(',')})`}
        strokeWidth={90}
        opacity={0.5}
        shadowColor={`rgb(${borderColor.join(',')})`}
        shadowBlur={10}
      />
      <Line // track
        points={bezierPoints.flatMap(({ x, y }) => [x, y])}
        lineCap="round"
        stroke={`rgb(${trackColor.join(',')})`}
        strokeWidth={80}
        shadowColor={`rgb(${trackColor.join(',')})`}
        shadowBlur={30}
        opacity={0.5}
      />
      <Circle // radius
        ref={radiusRef}
        radius={100}
        x={startPoint.x}
        y={startPoint.y}
        stroke="red"
      />
      <Circle // ball
        onClick={startAnimationHandler}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        onMouseLeave={(e) => handleCursor(e)}
        x={startPoint.x}
        y={startPoint.y}
        radius={35}
        shadowBlur={10}
        ref={circleRef}
        fill={`rgb(${ballColor2.join(',')})`}
        stroke={`rgb(${ballColor.join(',')})`}
        shadowColor={`rgb(${ballColor2.join(',')})`}
        strokeWidth={2}
      />
    </Group>
  );
}
