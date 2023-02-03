import IMapData from '../mapsDataTypes/mapsDataTypes';
import { userDataState } from '../userDataTypes/userData';

interface IReducers {
  mapsDataReducer: IMapData[];
  userDataReducer: userDataState;
}
export default IReducers;
