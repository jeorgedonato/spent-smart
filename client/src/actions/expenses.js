import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EXPENSES,
  EXPENSE_ERROR,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSE,
  GET_MONTHLY_EXPENSE,
  GET_MONTHLY_EXPENSE_CATEGORY
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

// Get Monthly Expense
// GET SUM : /api/expenses/monthly/:month/:year
export const getMonthlyExpenseSum = (month, year) => async dispatch => {
  // console.log(id)
  try {
    const res = await axios.get(`/api/expenses/monthly/${month}/${year}`);

    dispatch({
      type: GET_MONTHLY_EXPENSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Monthly Expense
// GET SUM : /api/expenses/monthly/:month/:year
export const getMonthlyExpenseCategorySum = (month, year) => async dispatch => {
  // console.log(id)
  try {
    const res = await axios.get(`/api/expenses/monthly/categories/${month}/${year}`);

    dispatch({
      type: GET_MONTHLY_EXPENSE_CATEGORY,
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
    // console.log(res)
    dispatch({
      type: ADD_EXPENSE,
      payload: res.data
    });
    window.location.replace('/expenses');
    dispatch(setAlert(`Expense Created`, 'success'));
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Expenses
// PUT : /api/expenses/:id
export const updateExpense = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // const {id, description, category , amount} = formData;
    const res = await axios.put(`/api/expenses/${id}`,formData,config);

    dispatch({
      type: UPDATE_EXPENSE,
      payload: res.data
    });
      window.location.replace('/expenses')
     dispatch(setAlert(`Expense Updated`, 'success'));
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

