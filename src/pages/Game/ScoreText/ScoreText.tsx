/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import {
  Group, Line, Circle, Text
} from 'react-konva';
import { IResultMessage } from '../../../types/gameTypes';

interface ScoreTextProps {
  message: IResultMessage;
  removeMessage: (id: string | undefined) => void;
}

function ScoreText({ message, removeMessage }: ScoreTextProps) {
  const {
    text, color, y, x, id,
  } = message;
  const textRef = useRef<Konva.Text | null>(null);

  const startTextAnimation = () => {
    if (textRef.current) {
      textRef.current.to({
        y: y - 100,
        duration: 1,
        easing: Konva.Easings.Linear,
      });
    }
  };

  setTimeout(() => {
    removeMessage(id);
  }, 1000);

  useEffect(() => {
    startTextAnimation();
  }, []);
  return (
    <Text
      onClick={() => textRef.current?.destroy()}
      ref={textRef}
      text={text.toString()}
      // visible={visible}
      fontSize={50}
      x={x}
      y={y}
      fill={color}
      fontStyle="bold"
      shadowColor="black"
      shadowOffset={{ x: 2, y: 2 }}
    />
  );
}

export default React.memo(ScoreText);
