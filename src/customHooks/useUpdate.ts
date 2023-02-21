/* eslint-disable max-len */
import { useSelector } from 'react-redux';
import { UpdatedObject } from '../types/gameTypes';
import { HitObjectCoords, HitObjects, Timing } from '../types/mapsDataTypes/osuDataTypes';
import IReducers from '../types/reducers/reducersType';

export default function useUpdate(
  objects: HitObjects[],
  timingPoints: Timing[],
  AR: number,
  OD: number,
  speedMultiplier: number
): UpdatedObject[] {
  const ARMultiplier = 1.0 + 0.1 * (10 - AR) + 0.05 * Math.max(0, 5 - AR);
  const ODMultiplier = 1.0 + 0.1 * (10 - OD);
  const { CX, CY } = useSelector((state: IReducers) => state.gameOptionsReducer.КСoefficient);

  const updatedObjects: UpdatedObject[] = objects.map((obj, index) => {
    const timingPoint = timingPoints.find(
      (tp) => tp.offset <= obj.time
    ) || timingPoints[timingPoints.length - 1];

    const timeToNextObj = (obj.type === 'circle' || obj.type === 'spinner')
      ? timingPoint.millisecondsPerBeat / (ODMultiplier * ARMultiplier)
      : timingPoint.millisecondsPerBeat * (obj.pixelLength! / (100 * ODMultiplier * ARMultiplier));

    const correctedTime = (obj.time / 0.5) - timeToNextObj;
    const nextObj = objects[index + 1];
    const nextObjTime = nextObj ? nextObj.time : obj.time + 3000;
    const animationTime = nextObjTime - obj.time;

    return {
      ...obj,
      time: obj.type === 'spinner' ? obj.time : correctedTime,
      animationTime: animationTime / speedMultiplier,
      unKey: window.crypto.randomUUID(),
      x: obj.x * CX,
      y: obj.y * CY,
      keyframes: obj.keyframes?.map((k: HitObjectCoords) => ({ x: k.x * CX, y: k.y * CY })),

    };
  });

  return updatedObjects;
}
