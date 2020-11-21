import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './types';

// Get Categories
// GET ALL : /api/categories
export const getCategories = type => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${type}`);
    // console.log(res)
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    // console.log(err)
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCategory = category => dispatch => {

  dispatch({
      type: ADD_CATEGORY,
      payload: category
    });

};