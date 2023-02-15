import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import userDataReducer from './reducers/userData/userDataReducer';
import mapsDataReducer from './reducers/mapsData/mapsDataReducer';
import { backgroundSourceReducer } from './reducers/selectMapPage/backgroundSourceReducer';
import { songIDReducer } from './reducers/selectMapPage/songIDReducer';
import { currentAudioSourceReducer } from './reducers/selectMapPage/currentAudioSourceReducer';
import { songDifficultyReducer } from './reducers/selectMapPage/songDifficultyReducer';

const rootReducer = combineReducers(
  {
    userDataReducer,
    mapsDataReducer,
    backgroundSourceReducer,
    songIDReducer,
    currentAudioSourceReducer,
    songDifficultyReducer,
  }
);
const store = createStore(rootReducer, composeWithDevTools());

export default store;
