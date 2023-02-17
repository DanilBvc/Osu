import { useEffect, useState } from 'react';
import {
  Circle
} from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { IGameElement } from '../../../types/gameTypes';
import spinnerMesh from '../../../assets/mesh/spinner.png';

function Spinner({
  model,
  audioRef,
}: IGameElement): JSX.Element {
  const image = new window.Image();
  image.src = spinnerMesh;
  const [rotation, setRotation] = useState<number>(0);
  const [holding, setHolding] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const lifeTime = 5000;

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (holding) {
      const stage = event.target.getStage();
      const pointerPos = stage?.getPointerPosition();
      if (stage && pointerPos) {
        const stagePos = {
          x: stage.width() / 2,
          y: stage.height() / 2,
        };
        const dx = pointerPos.x - stagePos.x;
        const dy = pointerPos.y - stagePos.y;
        const angle = Math.atan2(dy, dx);
        const rotationDeg = (angle * 180) / Math.PI;
        setRotation(rotationDeg);
      }
    }
  };

  const timeUpdate = () => {
    if (audioRef.current) {
      const currentTime = +(audioRef.current.currentTime * 1000).toFixed(0);

      if (currentTime > model.time && currentTime < model.time + lifeTime) {
        setVisible(true);
      } else setVisible(false);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', timeUpdate);
  }, []);

  return (
    <Circle
      visible={visible}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      radius={300}
      fillPatternImage={image}
      fillPatternScale={{ x: 0.9, y: 0.9 }}
      fillPatternOffsetX={333}
      fillPatternOffsetY={333}
      rotation={rotation}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
    />
  );
}

export default Spinner;
