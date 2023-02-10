/* eslint-disable no-use-before-define */
import { useSelector } from 'react-redux';
import { HitObjectCoords, HitObjects } from '../../types/mapsDataTypes/osuDataTypes';
import IReducers from '../../types/reducers/reducersType';

export interface IBezierProps {
  hitObjects: HitObjects;
  colors: string[][];
}

export default function Curve({ hitObjects, colors }: IBezierProps): JSX.Element {
  const { CX, CY } = useSelector((state: IReducers) => state.gameOptionsReducer.КСoefficient);
  const {
    x, y,
    keyframes,
    sliderType,
    time,
  } = hitObjects;
  let T;

  if (!keyframes) {
    return (
      <circle cx={x} cy={y} r="50" fill="red" />
    );
  }
  if (keyframes.length === 1) {
    T = 'L';
  } else if (keyframes.length === 2) {
    T = 'S';
  } else if (keyframes.length >= 3) {
    T = 'M';
  }
  const id = crypto.randomUUID();
  const startPosition = `M ${x * CX}, ${y * CY} ${T} `;
  let d = '';
  if (keyframes) {
    d = startPosition + (keyframes as HitObjectCoords[])
      .reduce((acc: number[], keyframe: HitObjectCoords) => {
        const current = [keyframe.x * CX, keyframe.y * CY];
        return acc.concat(current);
      }, []).join(', ');
  } else {
    console.log('no keys');
  }

  return (
    <>
      <path
        d={d}
        id={id}
        fill="none"
        strokeWidth="50"
        stroke="red"
      />
      <circle onClick={() => console.log('asd')} r={25} width={10} cx={10} cy={10}>
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath xlinkHref={`#${id}`} />
        </animateMotion>
      </circle>
    </>
  );
}
