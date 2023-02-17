import {
  useCallback,
  useEffect,
  useRef, useState
} from 'react';
import { Group, Line, Circle } from 'react-konva';
import Konva from 'konva';
import { IGameElement } from '../../../types/gameTypes';
import { handleCursor } from '../../../utils/game/gameCursorHandler';
import { defaultColors, defaultKeyframes } from '../../../utils/game/defaultValues';
import RadiusRing from '../RadiusRing/RadiusRing';

export default function GameSlider({
  colors,
  model,
  audioRef,
}: IGameElement): JSX.Element {
  const startPoint = { x: model.x, y: model.y };
  const bezierPoints = [startPoint, ...model.keyframes ?? defaultKeyframes];
  const circleRef = useRef<Konva.Circle | null>(null);
  const groupRef = useRef<Konva.Group | null>(null);
  const [ballColor1, trackColor, borderColor] = colors || defaultColors;
  const [visible, setVisible] = useState(false);

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
          duration: (model.animationTime / 1000) / points.length,
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

      if (currentTime > model.time && currentTime < model.time + model.animationTime) {
        setVisible(true);
        startAnimationHandler()();
        audioRef.current?.removeEventListener('timeupdate', timeUpdate);
      } else setVisible(false);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', timeUpdate);
  }, []);

  return (
    <Group ref={groupRef} visible={visible}>
      <Line // border
        points={bezierPoints.flatMap(({ x, y }) => [x, y])}
        lineCap="round"
        stroke={`rgb(${borderColor?.join(',')})`}
        strokeWidth={100}
        opacity={0.3}
        shadowColor={`rgb(${borderColor?.join(',')})`}
        shadowBlur={10}
      />
      <Line // track
        points={bezierPoints.flatMap(({ x, y }) => [x, y])}
        lineCap="round"
        stroke={`rgb(${trackColor.join(',')})`}
        strokeWidth={90}
        shadowColor={`rgb(${trackColor.join(',')})`}
        shadowBlur={30}
        opacity={0.3}
      />
      <RadiusRing x={startPoint.x} y={startPoint.y} visible={visible} />
      <Circle // ball
        onClick={startAnimationHandler}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        onMouseLeave={(e) => handleCursor(e)}
        x={startPoint.x}
        y={startPoint.y}
        radius={40}
        ref={circleRef}
        fill={`rgb(${ballColor1.join(',')})`}
        strokeWidth={1}
        opacity={1}
        shadowColor="black"
        shadowOffset={{ x: 5, y: 5 }}
        shadowBlur={10}
        shadowOpacity={0.8}
      />
    </Group>
  );
}
