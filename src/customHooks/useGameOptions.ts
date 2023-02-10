import { useDispatch, useSelector } from 'react-redux';
import { setGameDiffuculty } from '../store/reducers/game/gameOptionsReducer';
import IReducers from '../types/reducers/reducersType';

const useGameOptions = () => {
  const activeGameInfo = useSelector((state: IReducers) => state.activeGameReduccer);
  const { ApproachRate, CircleSize, OverallDifficulty } = activeGameInfo.mapData[0].difficulty;
  // const isHard = useSelector((state: IReducers) => state.gameOptionsReducer.isHard);
  const isHard = true;
  const dispatch = useDispatch();
  const difficulty = {
    OD: isHard ? OverallDifficulty * 1.4 : OverallDifficulty * 0.5,
    CS: isHard ? CircleSize * 1.3 : CircleSize * 0.5,
    AR: isHard ? ApproachRate * 1.4 : ApproachRate * 0.5,
  };

  dispatch(setGameDiffuculty(difficulty));
};

export default useGameOptions;
