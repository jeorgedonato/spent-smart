import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './types';

// Get Categories
// GET ALL : /api/categories
export const getCategories = () => async dispatch => {
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