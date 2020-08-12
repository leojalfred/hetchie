import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setToken from '../utils/authorization'

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
})

const setErrors = (dispatch, payload) => dispatch({ type: GET_ERRORS, payload })
export const putUser = (
  user,
  closeModal,
  register = false
) => async dispatch => {
  try {
    if (register) await axios.post('http://localhost:3001/users/register', user)
    else {
      const response = await axios.put('http://localhost:3001/users', user)
      dispatch(setCurrentUser(response.data))
    }

    setErrors(dispatch, {})
    closeModal()
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

function setState(dispatch, data) {
  dispatch(setCurrentUser(data))
  setErrors(dispatch, {})
}
export const loginUser = (user, history, closeModal) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3001/users/login', user)
    const { token } = response.data
    localStorage.setItem('jwtToken', token)
    setToken(token)

    const decoded = jwt_decode(token)
    setState(dispatch, decoded)

    history.push('/firms')
    closeModal()
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setToken(false)

  dispatch(setCurrentUser({}))
}

export const putPreferences = body => async dispatch => {
  try {
    const { data } = await axios.put(
      'http://localhost:3001/users/preferences',
      body
    )
    setState(dispatch, data)
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

export const putLists = body => async dispatch => {
  try {
    const { data } = await axios.put('http://localhost:3001/users/lists', body)
    setState(dispatch, data)
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}
