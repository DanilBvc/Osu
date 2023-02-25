/* eslint-disable no-nested-ternary */
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  Circle, Group
} from 'react-konva';
import { useDispatch } from 'react-redux';
import {
  setHitCountAction, setTotalHitsAction, setTotalObjectsAction, updatePointsAction
} from '../../../store/reducers/game/gameScoreReducer';
import { IGameElement } from '../../../types/gameTypes';
import { defaultColors } from '../../../utils/game/defaultValues';
import { handleCursor } from '../../../utils/game/gameCursorHandler';
import RadiusRing from '../RadiusRing/RadiusRing';

function GameCircle({
  model,
  colors,
  messageHandler,
  handleHitSound,
}: IGameElement): JSX.Element {
  const circleRef = useRef<Konva.Circle | null>(null);
  const elementRef = useRef<Konva.Group | null>(null);
  const dispatch = useDispatch();
  const [fillColor] = colors || defaultColors;
  const { x, y } = model;
  const [result, setResult] = useState({ text: 0, color: 'red' });
  const prevResultRef = useRef<{ text: number; color: string } | null>();

  const scoreHandler = useCallback((e: KonvaEventObject<MouseEvent>): void => {
    const clickResult = Math.abs(e.evt.clientX - x) + Math.abs(e.evt.clientY - y);
    const points = clickResult < 10 ? 300 : clickResult < 25 ? 100 : 50;
    setResult(() => ({ text: points, color: 'green' }));
    dispatch(updatePointsAction(points));
    dispatch(setHitCountAction(points));
    dispatch(setTotalHitsAction());
  }, []);

  useEffect(() => {
    if (!prevResultRef.current) {
      prevResultRef.current = result;
      return;
    }
    messageHandler!({ ...result, x, y });
  }, [result]);

  useEffect(() => {
    dispatch(setTotalObjectsAction());
  }, []);

  useEffect(() => {
    if (circleRef.current && elementRef.current) {
      const circle = circleRef.current;
      const element = elementRef.current;

      circle.to({
        opacity: 1,
        duration: 1,
        onFinish: () => {
          circle.to({
            rotation: 360,
            duration: model.animationTime / 1000,
            onFinish: () => {
              element.to({
                y: y + 100,
                opacity: 0,
                duration: 0.5,
                onFinish: () => {
                  element.destroy();
                },
              });
            },
          });
        },
      });
    }
  }, []);

  return (
    <Group x={x} y={y} ref={elementRef}>
      <RadiusRing />
      <Circle
        onClick={(e) => {
          scoreHandler(e);
          circleRef.current?.destroy();
          handleHitSound(model.hitSound);
        }}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        radius={55}
        fill={`rgba(${fillColor?.join(',')},1)`}
        shadowColor="black"
        shadowOffset={{ x: 5, y: 5 }}
        shadowBlur={10}
        shadowOpacity={0.8}
        ref={circleRef}
        opacity={0}
      />
    </Group>
  );
}

export default GameCircle;
