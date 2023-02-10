import { useDispatch, useSelector } from 'react-redux';
import { setGameResolution } from '../store/reducers/game/gameOptionsReducer';
import { HitObjects } from '../types/mapsDataTypes/osuDataTypes';
import IReducers from '../types/reducers/reducersType';

const useClientResolution = () => {
  const { hitObjects } = useSelector(
    (state: IReducers) => state.mapsDataReducer[0].mapData[0] // 0 = захаркоженная сложность
  );
  const dispatch = useDispatch();

  const resolutionCoefficients = {
    CX: +(window.innerWidth / Math.max(...hitObjects.map((obj: HitObjects) => obj.x))).toFixed(0),
    CY: +(window.innerHeight / Math.max(...hitObjects.map((obj: HitObjects) => obj.y))).toFixed(0),
  };
  dispatch(setGameResolution(resolutionCoefficients));
};

export default useClientResolution;
