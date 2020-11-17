import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import expenses from './expenses';

export default combineReducers({
  auth,
  alert,
  expenses
});