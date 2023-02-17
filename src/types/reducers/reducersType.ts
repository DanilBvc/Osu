import { IGameOptions } from '../../store/reducers/game/gameOptionsReducer';
import { IGameScore } from '../../store/reducers/game/gameScoreReducer';
import IMapData from '../mapsDataTypes/mapsDataTypes';
import { userDataState } from '../userDataTypes/userData';

interface IReducers {
  mapsDataReducer: IMapData[];
  userDataReducer: userDataState;
  backgroundSourceReducer: string;
  songIDReducer: string;
  currentAudioReducer: HTMLAudioElement[];
  activeGameReduccer: IMapData;
  gameOptionsReducer: IGameOptions;
  gameScoreReducer: IGameScore;
}
export default IReducers;
