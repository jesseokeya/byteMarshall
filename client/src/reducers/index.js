import { combineReducers } from 'redux';
import compileReducer from './compileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  compiled: compileReducer,
  error: errorReducer
});