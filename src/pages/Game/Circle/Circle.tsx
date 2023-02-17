import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Group } from 'react-konva';
import { useDispatch } from 'react-redux';
import { IGameElement } from '../../../types/gameTypes';
import { defaultColors } from '../../../utils/game/defaultValues';
import { handleCursor } from '../../../utils/game/gameCursorHandler';
import RadiusRing from '../RadiusRing/RadiusRing';

export default function GameCircle({
  model,
  colors,
  audioRef,
}: IGameElement): JSX.Element {
  const circleRef = useRef<Konva.Circle | null>(null);
  const [fillColor] = colors || defaultColors;
  const {
    x, y, time, animationTime,
  } = model;
  const [visible, setVisible] = useState(false);

  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);

      if (currentTime > time && currentTime < time + animationTime) {
        setVisible(true);
        audioRef.current?.removeEventListener('timeupdate', timeUpdate);

        setTimeout(() => {
          circleRef.current?.destroy();
        }, animationTime);
      } else setVisible(false);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', timeUpdate);
  }, []);

  const dispatch = useDispatch();
  // const scoreHandler = () => {

  // }

  return (
    <Group visible={visible}>
      <RadiusRing x={x} y={y} visible={visible} />
      <Circle
        onClick={() => circleRef.current?.destroy()}
        onMouseEnter={(e) => handleCursor(e)}
        onPointerClick={(e) => handleCursor(e)}
        x={x}
        y={y}
        radius={40}
        fill={`rgba(${fillColor?.join(',')},1)`}
        ref={circleRef}
        shadowColor="black"
        shadowOffset={{ x: 5, y: 5 }}
        shadowBlur={10}
        shadowOpacity={0.8}
      />
    </Group>
  );
}
