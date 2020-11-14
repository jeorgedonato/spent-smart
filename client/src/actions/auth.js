import axios from 'axios';
import {setAlert} from './alert';
// import {Redirect} from 'react-router-dom';
//Importing the types from types file to use for dispatching types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CONFIRM_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

//loading User
export const loadUser = () => async dispatch => {
  //setting the token to axios header
   if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    //getting data from the backend for user authentication
    const res = await axios.get('/api/auth');

    //dispatching our data to the reducer if we didnt received an error
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }

};

export const register = ({ firstname, lastname, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ firstname, lastname, email, password });
 
  try {
    const res = await axios.post('/api/users/register', body, config);
    // console.log(res)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: ""
    });
    
    dispatch(loadUser());
    dispatch(setAlert(res.data,'success'));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
    
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // console.log("login")
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const confirm = (id) => async dispatch => {

  try {
    const res = await axios.get('/api/users/confirm/'+id);
    // console.log(res)
    dispatch({
      type: CONFIRM_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    dispatch(setAlert("Your account is confirmed", 'success'))
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};