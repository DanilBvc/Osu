import { combineReducers, createStore, applyMiddleware } from 'redux';
import userDataReducer from './reducers/userData/userDataReducer';
import saveUserData from './middleware/saveUserData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = createStore(userDataReducer as any, applyMiddleware(saveUserData as any));
export default store;
