import {
  combineReducers, createStore, applyMiddleware, compose, MiddlewareAPI, Dispatch, Middleware
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import userDataReducer from './reducers/userData/userDataReducer';
import mapsDataReducer from './reducers/mapsData/mapsDataReducer';
import { backgroundSourceReducer } from './reducers/selectMapPage/backgroundSourceReducer';
import { songIDReducer } from './reducers/selectMapPage/songIDReducer';
import activeGameReduccer from './reducers/game/selectGameReducer';
import gameOptionsReducer from './reducers/game/gameOptionsReducer';
import { currentAudioSourceReducer } from './reducers/selectMapPage/currentAudioSourceReducer';
import { songDifficultyReducer } from './reducers/selectMapPage/songDifficultyReducer';
import saveUserData from './middleware/saveUserData';
import { gameScoreReducer } from './reducers/game/gameScoreReducer';

const rootReducer = combineReducers(
  {
    userDataReducer,
    mapsDataReducer,
    backgroundSourceReducer,
    songIDReducer,
    currentAudioSourceReducer,
    songDifficultyReducer,
    activeGameReduccer,
    gameOptionsReducer,
    gameScoreReducer,
  }
);
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saveUserData as unknown as Middleware))
);

export default store;
