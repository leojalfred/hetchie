import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_ERRORS } from './types'

export const registerUser = (userData, closeModal) => async (dispatch) => {
  try {
    await axios.post('/users/register', userData)

    dispatch({ type: SET_ERRORS, payload: {} })
    closeModal()
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const loginUser = (userData, history, closeModal) => async (
  dispatch
) => {
  try {
    const response = await axios.post('/users/login', userData)
    const { token } = response.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)

    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
    dispatch({ type: SET_ERRORS, payload: {} })

    history.push('/firms')
    closeModal()
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const updateUser = (userData, closeModal) => async (dispatch) => {}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

export const setUserLoading = () => ({ type: USER_LOADING })

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)

  dispatch(setCurrentUser({}))
}
