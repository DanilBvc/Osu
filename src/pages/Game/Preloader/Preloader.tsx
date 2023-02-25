import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Group, Line, Text } from 'react-konva';

interface PreloaderProps {
  animationTime: number;
}

export default function Preloader({ animationTime }: PreloaderProps): JSX.Element {
  const [lineWidth, setLineWidth] = useState<number>(700);
  const lineRef = useRef<Konva.Line | null>(null);
  const elementsRef = useRef<Konva.Group | null>(null);
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);
  const textRef = useRef<Konva.Text | null>(null);
  const [time, setTime] = useState(animationTime / 1000 + 1);

  const anim = () => {
    if (lineRef.current) {
      lineRef.current.to({
        points: [0, 0, 0, 0],
        duration: animationTime / 1000 + 1,
        onFinish: () => {
          elementsRef.current?.destroy();
          clearInterval(timerRef.current as NodeJS.Timeout);
        },
      });
    }
  };

  useEffect(() => {
    anim();
    timerRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <Group ref={elementsRef}>
      <Text
        x={window.innerWidth / 2 - 30}
        y={window.innerHeight / 2 - 200}
        text={time.toString()}
        ref={textRef}
        fontSize={100}
        fill="#fff"
      />
      <Line
        ref={lineRef}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        points={[-lineWidth / 2, 0, lineWidth / 2, 0]}
        stroke="#fff"
        strokeWidth={20}
        lineCap="round"
      />

    </Group>
  );
}
