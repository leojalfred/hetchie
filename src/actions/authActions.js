import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_ERRORS,
} from './types';

async function login(url, userData, dispatch, closeModal) {
  try {
    const response = await axios.post(url, userData);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

    dispatch({ type: SET_ERRORS, payload: {} });
    closeModal();
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
}

export const registerUser = (userData, closeModal) => (dispatch) => {
  login('/users/register', userData, dispatch, closeModal);
};

export const loginUser = (userData, closeModal) => (dispatch) => {
  login('/users/login', userData, dispatch, closeModal);
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => ({ type: USER_LOADING });

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
