import { useDispatch } from 'react-redux';
import { setGameResolution } from '../store/reducers/game/gameOptionsReducer';

const useClientResolution = () => {
  const dispatch = useDispatch();

  const resolutionCoefficients = {
    CX: +(window.innerWidth / 512).toFixed(2),
    CY: +(window.innerHeight / 384).toFixed(2),
  };
  dispatch(setGameResolution(resolutionCoefficients));
};

export default useClientResolution;
