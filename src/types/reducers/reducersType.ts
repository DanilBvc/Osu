import IMapData from '../mapsDataTypes/mapsDataTypes';
import { userDataState } from '../userDataTypes/userData';

interface IReducers {
  mapsDataReducer: IMapData[];
  userDataReducer: userDataState;
  backgroundSourceReducer: string;
  songIDReducer: string;
  currentAudioReducer: HTMLAudioElement[];
  audioSourceNodeReducer: MediaElementAudioSourceNode;
  audioContextReducer: AudioContext;
  songDifficultyReducer: string;
}
export default IReducers;
