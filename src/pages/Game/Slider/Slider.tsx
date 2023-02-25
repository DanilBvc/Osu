import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import {
  Group, Line, Circle, Text
} from 'react-konva';
import { useDispatch } from 'react-redux';
import { IGameElement } from '../../../types/gameTypes';
import { handleCursor } from '../../../utils/game/gameCursorHandler';
import { defaultColors, defaultKeyframes } from '../../../utils/game/defaultValues';
import RadiusRing from '../RadiusRing/RadiusRing';
import { setTotalHitsAction, setTotalObjectsAction, updatePointsAction } from '../../../store/reducers/game/gameScoreReducer';

function GameSlider({
  colors,
  model,
  layerRef,
}: IGameElement): JSX.Element {
  const circleRef = useRef<Konva.Group | null>(null);
  const elementRef = useRef<Konva.Group | null>(null);
  const trackRef = useRef<Konva.Group | null>(null);
  const dispatch = useDispatch();
  const startPoint = { x: model.x, y: model.y };
  const bezierPoints = [startPoint, ...model.keyframes || defaultKeyframes];
  const [ballColor1, trackColor, borderColor] = colors ?? defaultColors;
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [textVisible, setTextVisible] = useState<boolean>(false);
  const [result, setResult] = useState({ text: 0, color: 'red' });
  const [inFade, setInFade] = useState(true);
  const [hit, setHit] = useState(false);

  const startAnimationBall = (points = bezierPoints, index = 0): void => {
    if (points.length === index && elementRef.current && circleRef.current) {
      circleRef.current.to({
        y: bezierPoints[bezierPoints.length - 1].y + 100,
        opacity: 0,
        duration: 0.5,
        onFinish: () => {
          elementRef.current?.destroy();
        },
      });

      trackRef.current?.to({
        x: -100 - 0.5 + Math.random() * (200 - 0 + 1),
        y: -100 - 0.5 + Math.random() * (200 - 0 + 1),
        opacity: 0,
        duration: 0.5,
      });
      return;
    }
    if (circleRef.current) {
      const circle = circleRef.current;
      circle.to({
        x: points[index].x,
        y: points[index].y,
        duration: (model.animationTime / 1000) / points.length,
        easing: Konva.Easings.Linear,
        onFinish: () => {
          startAnimationBall(points, index + 1);
        },
      });
    }
  };

  const scoreHandler = () => {
    if (isHolding && circleRef.current && model.pixelLength) {
      setTextVisible(true);
      const point = +((model.animationTime / model.pixelLength) / 10).toFixed(0);
      setResult({ ...result, text: result.text += point, color: 'green' });
      dispatch(updatePointsAction(point));
    } else {
      setTextVisible(false);
    }
  };

  useEffect(() => {
    if (layerRef.current && elementRef.current) {
      layerRef.current.getLayer().add(elementRef.current);
    }
  }, []);

  useEffect(() => {
    const antime = setTimeout(() => {
      startAnimationBall();
    }, 500);
    dispatch(setTotalObjectsAction());
    return () => clearTimeout(antime);
  }, []);

  useEffect(() => {
    const fadeTime = setTimeout(() => {
      setInFade(false);
    }, 500);
    return () => clearTimeout(fadeTime);
  }, []);

  const hitHandler = () => {
    if (hit) return;
    dispatch(setTotalHitsAction());
    setHit(true);
  };

  return (
    <Group
      ref={elementRef}
    >
      <Group
        ref={trackRef}
      >
        <Line // border
          points={bezierPoints.flatMap(({ x, y }) => [x, y])}
          lineCap="round"
          stroke={`rgb(${borderColor?.join(',')})`}
          strokeWidth={120}
          opacity={0.3}
          shadowColor={`rgb(${borderColor?.join(',')})`}
          shadowBlur={10}
        />
        <Line // track
          points={bezierPoints.flatMap(({ x, y }) => [x, y])}
          lineCap="round"
          stroke={`rgb(${trackColor?.join(',')})`}
          strokeWidth={110}
          shadowColor={`rgb(${trackColor?.join(',')})`}
          shadowBlur={30}
          opacity={0.3}
        />
      </Group>

      <Group
        x={startPoint.x}
        y={startPoint.y}
        ref={circleRef}
        onMouseDown={() => {
          setIsHolding(true);
          hitHandler();
        }}
        onMouseUp={() => {
          setIsHolding(false);
        }}
        onMouseEnter={(e) => {
          handleCursor(e);
        }}
        onPointerClick={(e) => handleCursor(e)}
        onMouseLeave={(e) => {
          handleCursor(e);
        }}
        onMouseMove={scoreHandler}
      >
        <RadiusRing />
        <Circle // ball
          radius={55}
          fill={`rgb(${ballColor1?.join(',')})`}
          strokeWidth={1}
          opacity={inFade ? 0.2 : 1}
          shadowColor="black"
          shadowOffset={{ x: 5, y: 5 }}
          shadowBlur={10}
          shadowOpacity={0.8}
        />
        <Text
          text={result.text.toString()}
          visible={textVisible}
          fontSize={50}
          fill={result.color}
          fontStyle="bold"
          shadowColor="black"
          shadowOffset={{ x: 2, y: 2 }}
        />
      </Group>

    </Group>
  );
}

export default React.memo(GameSlider);
