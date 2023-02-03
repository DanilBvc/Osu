import { combineReducers, createStore, applyMiddleware } from 'redux';
import userDataReducer from './reducers/userData/userDataReducer';
import saveUserData from './middleware/saveUserData';
import mapsDataReducer from './reducers/mapsData/mapsDataReducer';
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const rootReducer = combineReducers({ userDataReducer, mapsDataReducer });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = createStore(rootReducer, applyMiddleware(saveUserData as any));
export default store;
