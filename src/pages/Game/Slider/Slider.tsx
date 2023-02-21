import React, {
  useEffect, useRef, useState
} from 'react';
import Konva from 'konva';
import {
  Group, Line, Circle, Text, Image
} from 'react-konva';
import { useDispatch } from 'react-redux';

import { IGameElement } from '../../../types/gameTypes';
import { handleCursor } from '../../../utils/game/gameCursorHandler';
import { defaultColors, defaultKeyframes } from '../../../utils/game/defaultValues';
import RadiusRing from '../RadiusRing/RadiusRing';
import { setTotalHitsAction, setTotalObjectsAction, updatePointsAction } from '../../../store/reducers/game/gameScoreReducer';

import ring from '../../../assets/mesh/ring.png';
import ring2 from '../../../assets/mesh/ring2.png';

function GameSlider({
  colors,
  model,
  layerRef,
}: IGameElement): JSX.Element {
  const circleRef = useRef<Konva.Group | null>(null);
  const elementRef = useRef<Konva.Group | null>(null);
  const dispatch = useDispatch();
  const startPoint = { x: model.x, y: model.y };
  const bezierPoints = [startPoint, ...model.keyframes || defaultKeyframes];
  const [ballColor1, trackColor, borderColor] = colors ?? defaultColors;
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [textVisible, setTextVisible] = useState<boolean>(false);
  const [result, setResult] = useState({ text: 0, color: 'red' });

  const strokeImage = new window.Image();
  strokeImage.src = ring;

  const strokeImage2 = new window.Image();
  strokeImage2.src = ring2;

  const startAnimationBall = (points = bezierPoints, index = 0): void => {
    if (points.length === index && elementRef.current) {
      elementRef.current.destroy();
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

  const scoreHandler = (): void => {
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
    // return () => {
    //   if (elementRef.current) {
    //     elementRef.current.destroy();
    //   }
    // };
  }, []);

  useEffect(() => {
    startAnimationBall();

    return () => {
      dispatch(setTotalObjectsAction());
    };
  }, []);

  return (
    <Group ref={elementRef}>
      <Group>
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
          stroke={`rgb(${trackColor?.join(',')})`}
          strokeWidth={90}
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
          dispatch(setTotalHitsAction());
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
          setIsHolding(false);
        }}
        onMouseMove={scoreHandler}
      >
        <RadiusRing />
        {/* <Circle
          radius={55}
          // stroke="orange"
          strokeWidth={10}
          points={[0, 0, 100, 100]}

          strokePatternImage={strokeImage}
          strokeScaleEnabled={false}
        /> */}
        {/* <Image
          image={strokeImage}
          visible={isHolding}
          x={-73}
          y={-70}
          // width={150}
          // height={150}
          scale={{ x: 0.12, y: 0.12 }}
        /> */}

        <Image
          image={strokeImage2}
          visible={isHolding}
          width={130}
          height={130}
          x={-65}
          y={-65}
        // scale={{ x: 0.1, y: 0.1 }}
        />
        <Circle // ball
          radius={40}
          fill={`rgb(${ballColor1?.join(',')})`}
          strokeWidth={1}
          opacity={1}
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
