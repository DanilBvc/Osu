import { useSelector } from 'react-redux';
import { UpdatedObject } from '../types/gameTypes';
import { Data, HitObjects } from '../types/mapsDataTypes/osuDataTypes';
import IReducers from '../types/reducers/reducersType';

const useUpdatedObjects = (mapData: Data): UpdatedObject[] => {
  const { CX, CY } = useSelector((state: IReducers) => state.gameOptionsReducer.КСoefficient);
  const { hitObjects } = mapData;

  const difficulty = 0.5; // хардкод

  return hitObjects.map((object: HitObjects) => {
    const keyframesArray = object.keyframes?.map((frame) => {
      const { x, y } = frame;
      return {
        x: x * CX,
        y: y * CY,
      };
    });

    const newObject: UpdatedObject = {
      ...object,
      x: object.x * CX,
      y: object.y * CY,
      visible: false,
      unKey: window.crypto.randomUUID(),
      time: object.time / difficulty,
    };

    if (object.keyframes !== undefined) {
      newObject.keyframes = keyframesArray;
    }

    return newObject;
  });
};

export default useUpdatedObjects;
