import { IGameOptions } from '../../store/reducers/game/gameOptionsReducer';
import { IGameScore } from '../../store/reducers/game/gameScoreReducer';
import IMapData from '../mapsDataTypes/mapsDataTypes';
import { userDataState } from '../userDataTypes/userData';

interface IReducers {
  mapsDataReducer: IMapData[];
  userDataReducer: userDataState;
  backgroundSourceReducer: string;
  songIDReducer: string;
  currentAudioSourceReducer: string;
  activeGameReduccer: IMapData;
  gameOptionsReducer: IGameOptions;
  gameScoreReducer: IGameScore;
  songDifficultyReducer: string;
}
export default IReducers;
