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
  GET_MONTHLY_EXPENSE_CATEGORY,
  GET_YEARLY_SAVINGS,
  RESET_LOADING
} from './types';
import moment from 'moment';

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
export const getMonthlyExpenseSum = (month, year, id = null) => async dispatch => {
  // console.log(id)
  try {
    const res = await axios.get(`/api/expenses/monthly/${month}/${year}/${id}`);

    dispatch({
      type: GET_MONTHLY_EXPENSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXPENSE_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Monthly Expense
// GET SUM : /api/expenses/monthly/:month/:year
export const getMonthlyExpenseCategorySum = (month, year) => async dispatch => {
  // console.log(id)
  try {
    const res = await axios.get(`/api/expenses/yearly/categories/${month}/${year}`);

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

    dispatch(getExpenses());

    // window.location.replace('/expenses');
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

    dispatch(getExpenses());
      // window.location.replace('/expenses')
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

export const getYearlySaving = () => async dispatch => {
  try {
    const year = moment().format("YYYY");
    const {data} = await axios.get(`/api/expenses/yearly/savings/${year}`);
    let months = [
      {name: 'Jan', num : 1},
      {name: 'Feb', num : 2},
      {name: 'Mar', num : 3},
      {name: 'Apr', num : 4},
      {name: 'May', num : 5},
      {name: 'Jun', num : 6},
      {name: 'Jul', num : 7},
      {name: 'Aug', num : 8},
      {name: 'Sep', num : 9},
      {name: 'Oct', num : 10},
      {name: 'Nov', num : 11},
      {name: 'Dec', num : 12},
    ];
    const {income, expense} = data;
    months.map(m => {
      const incomeSum = income.filter(i => {return i.month_created === m.num}).reduce((incS,curInc) => {return incS + curInc.amount},0);
      const expenseSum = expense.filter(i => {return i.month_created === m.num}).reduce((incS,curInc) => {return incS + curInc.amount},0);
      m['amount'] = incomeSum - expenseSum;
    });
    // console.log(months);

    dispatch({
      type: GET_YEARLY_SAVINGS,
      payload : months
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: EXPENSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



