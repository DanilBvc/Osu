import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Group } from 'react-konva';
import { IGameElement } from '../../../types/gameTypes';
import { handleCursor } from '../../../utils/gameCursorHandler';

export default function GameCircle({
  model,
  colors,
  audioRef,
}: IGameElement) {
  const circleRef = useRef<Konva.Circle | null>(null);
  const [borderColor, fillColor] = colors;
  const { x, y, time } = model;
  const radius = 40; // хардкод
  const [visible, setVisible] = useState(false);

  const lifeTime = 1000; // хардкод

  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);

      if (currentTime > time && currentTime < time + lifeTime) {
        setVisible(true);
        audioRef.current?.removeEventListener('timeupdate', timeUpdate);

        setTimeout(() => {
          circleRef.current?.destroy();
        }, lifeTime);
      } else setVisible(false);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', timeUpdate);
  }, []);

  return (
    <Group visible={visible}>
      <Circle
        onClick={() => circleRef.current?.destroy()}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        x={x}
        y={y}
        stroke={`rgba(${borderColor.join(',')},1)`}
        radius={radius}
        fill={`rgba(${fillColor.join(',')},1)`}
        ref={circleRef}
      />
    </Group>
  );
}
