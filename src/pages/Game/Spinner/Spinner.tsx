/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Circle, Arc, Group } from 'react-konva';
import { IGameElement } from '../../../types/gameTypes';

function Spinner({ spinner }: any) {
  const endAngle = (360 * (spinner.endTime - spinner.time)) / (spinner.endTime - spinner.time);
  return (
    <Group x={spinner.x} y={spinner.y}>
      <Circle
        radius={84}
        stroke="#ffffff"
        strokeWidth={4}
        dash={[8, 8]}
        dashOffset={16}
        rotation={90}
      />
      <Arc
        angle={endAngle}
        rotation={-90}
        innerRadius={0}
        outerRadius={84}
        fill="#ffffff"
      />
    </Group>
  );
}

export default Spinner;
