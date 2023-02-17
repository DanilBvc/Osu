import { useSelector } from 'react-redux';
import IReducers from '../../../types/reducers/reducersType';
import './gameBar.scss';

export default function GameBar(): JSX.Element {
  const { accuracy, points } = useSelector((state: IReducers) => state.gameScoreReducer);

  return (
    <div className="game-bar">
      <p className="accuracy">
        {accuracy}
        %
      </p>
      <p className="points">{points}</p>
    </div>
  );
}
