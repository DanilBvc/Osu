import { HitObjectCoords, HitObjects } from '../../types/mapsDataTypes/osuDataTypes';

export interface IBezierProps {
  hitObjects: HitObjects;
  colors: string[][];
}

export default function Curve({ hitObjects, colors }: IBezierProps): JSX.Element {
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
  const startPosition = `M ${x}, ${y} ${T} `;
  let d = '';
  if (keyframes) {
    d = startPosition + (keyframes as HitObjectCoords[])
      .reduce((acc: number[], keyframe: HitObjectCoords) => {
        const current = [keyframe.x, keyframe.y];
        return acc.concat(current);
      }, []).join(', ');
  } else {
    console.log('no keys');
  }

  return (
    <>
      <path
        width={10}
        d={d}
        id={id}
        onClick={() => console.log('click')}
        fill="none"
        strokeWidth="1"
        stroke="red"
      />
      <circle r={3} width={10} cx={10} cy={10}>
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath xlinkHref={`#${id}`} />
        </animateMotion>
      </circle>
    </>
  );
}
