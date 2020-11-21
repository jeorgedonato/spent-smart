import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_INCOMES,
    INCOME_ERROR,
    ADD_INCOME,
    UPDATE_INCOME,
    DELETE_INCOME,
    GET_INCOME,
    GET_MONTHLY_INCOME
} from './types';

// Get incomes
// GET ALL : /api/incomes
export const getIncomes = () => async dispatch => {
    try {
        const res = await axios.get('/api/incomes');
        // console.log(res)
        dispatch({
            type: GET_INCOMES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get income
// GET ONE : /api/incomes/:id
export const getIncome = id => async dispatch => {
    try {
        const res = await axios.get(`/api/incomes/${id}`);

        dispatch({
            type: GET_INCOME,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get Monthly Income
// GET SUM : /api/incomes/monthly/:month/:year
export const getMonthlyIncomeSum = (month, year) => async dispatch => {
  // console.log(id)
  try {
    const res = await axios.get(`/api/incomes/monthly/${month}/${year}`);

    dispatch({
      type: GET_MONTHLY_INCOME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INCOME_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Post income
// POST : /api/incomes
export const addIncome = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/incomes', formData, config);

        dispatch({
            type: ADD_INCOME,
            payload: res.data
        });

        dispatch(setAlert(`Income ${res.data.name} Created`, 'success'));
    } catch (err) {
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Update incomes
// PUT : /api/incomes/:id
export const updateIncome = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        // const { id, name, category, dueDate, amount } = formData;
        const res = await axios.put(`/api/incomes/${id}`, formData, config);

        dispatch({
            type: UPDATE_INCOME,
            payload: res.data
        });
        dispatch(setAlert(`Income ${res.data.name} is Updated`, 'success'));
    } catch (err) {
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deleteIncome = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/incomes/${id}`);

        dispatch({
            type: DELETE_INCOME,
            payload: id
        });

        dispatch(setAlert('Income Removed', 'success'));
    } catch (err) {
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};