/* eslint-disable no-nested-ternary */
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React, {
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
}: IGameElement): JSX.Element {
  const circleRef = useRef<Konva.Group | null>(null);
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
    dispatch(setTotalObjectsAction());
  }, []);

  useEffect(() => {
    if (!prevResultRef.current) {
      prevResultRef.current = result;
      return;
    }

    messageHandler!({ ...result, x, y });

    prevResultRef.current = result;
  }, [result]);
  return (

    <Group x={x} y={y} ref={circleRef}>
      <RadiusRing />
      <Circle
        onClick={(e) => {
          scoreHandler(e);
          circleRef.current?.destroy();
        }}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        radius={40}
        fill={`rgba(${fillColor?.join(',')},1)`}
        shadowColor="black"
        shadowOffset={{ x: 5, y: 5 }}
        shadowBlur={10}
        shadowOpacity={0.8}
      />

    </Group>

  );
}

export default GameCircle;
