import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EXPENSES,
  EXPENSE_ERROR,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSE
} from './types';

// Get Expenses
// API : 
export const getExpenses = () => async dispatch => {
  try {
    const res = await axios.get('/api/expenses');

    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Expense
export const getExpense = id => async dispatch => {
  try {
    const res = await axios.get(`/api/expenses/${id}`);

    dispatch({
      type: GET_EXPENSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExpense = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/expenses', formData, config);

    dispatch({
      type: ADD_EXPENSE,
      payload: res.data
    });

    dispatch(setAlert(`Expense ${res.data.name} Created`, 'success'));
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateExpense = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


