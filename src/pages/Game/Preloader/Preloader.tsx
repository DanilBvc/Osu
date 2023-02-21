import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Group, Line, Text } from 'react-konva';

export default function Preloader(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [animation, setAnimation] = useState<Konva.Animation | null>(null);
  const animationRef = useRef<Konva.Animation | null>(null);
  const elementRef = useRef<Konva.Group | null>(null);

  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      const newProgress = progressRef.current + frame!.timeDiff / 3000;
      if (newProgress >= 1) {
        setProgress(1);
        anim.stop();
      } else {
        setProgress(newProgress);
        progressRef.current = newProgress;
      }
    });
    setAnimation(anim);
    animationRef.current = anim;
    return () => {
      anim.stop();
      elementRef.current!.destroy();
      setAnimation(null);
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (animation) {
      animation.start();
    }
  }, [animation]);

  return (
    <Group ref={elementRef}>
      <Line
        x={window.innerWidth / 2 - 150}
        y={window.innerHeight / 2}
        points={[0, 0, 300 * progress, 0]}
        stroke="#00ccff"
        strokeWidth={5}
        lineCap="round"
      />
      <Text
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 20}
        text={`${Math.round(progress * 100)}%`}
        fontSize={24}
        fontFamily="Arial"
        fill="#00ccff"
      />
    </Group>
  );
}
