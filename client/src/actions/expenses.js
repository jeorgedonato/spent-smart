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
// GET ALL : /api/expenses
export const getExpenses = () => async dispatch => {
  try {
    const res = await axios.get('/api/expenses');
    // console.log(res)
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
// GET ONE : /api/expenses/:id
export const getExpense = id => async dispatch => {
  // console.log(id)
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

// Post Expense
// POST : /api/expenses
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

// Update Expenses
// PUT : /api/expenses/:id
export const updateExpense = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const {id, name, category , dueDate, amount} = formData;
    const res = await axios.put(`/api/expenses/${id}`,{name,category,dueDate,amount},config);

    dispatch({
      type: UPDATE_EXPENSE,
      payload: res.data
    });
     dispatch(setAlert(`Expense ${res.data.name} is Updated`, 'success'));
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteExpense = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/expenses/${id}`);

    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    });

    dispatch(setAlert('Expense Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

