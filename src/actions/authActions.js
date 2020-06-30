import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'

export const putUser = (
  user,
  closeModal,
  register = false
) => async dispatch => {
  try {
    if (register) await axios.post('/users/register', user)
    else {
      const response = await axios.put('/users', user)
      dispatch(setCurrentUser(response.data))
    }

    dispatch({ type: GET_ERRORS, payload: {} })
    closeModal()
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const loginUser = (user, history, closeModal) => async dispatch => {
  try {
    const response = await axios.post('/users/login', user)
    const { token } = response.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)

    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
    dispatch({ type: GET_ERRORS, payload: {} })

    history.push('/firms')
    closeModal()
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)

  dispatch(setCurrentUser({}))
}
