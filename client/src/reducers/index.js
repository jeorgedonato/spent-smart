import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import incomes from './incomes';
import expenses from './expenses';
import categories from './categories';

export default combineReducers({
  auth,
  alert,
  incomes,
  expenses,
  categories
});