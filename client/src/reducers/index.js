import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import expenses from './expenses';
import categories from './categories';

export default combineReducers({
  auth,
  alert,
  expenses,
  categories
});