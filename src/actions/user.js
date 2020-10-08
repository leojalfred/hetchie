import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { SET_ERROR, SET_USER } from './types'
import setToken from '../utils/authorization'

export const setUser = decoded => ({
  type: SET_USER,
  payload: decoded,
})

const setErrors = (dispatch, payload) => dispatch({ type: SET_ERROR, payload })
export const putUser = (
  user,
  closeModal,
  register = false
) => async dispatch => {
  try {
    if (register) await axios.post('/api/users/register', user)
    else {
      const response = await axios.put('/api/users', user)
      dispatch(setUser(response.data))
    }

    setErrors(dispatch, {})
    closeModal()
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

function setState(dispatch, data) {
  dispatch(setUser(data))
  setErrors(dispatch, {})
}
export const login = (user, history, closeModal) => async dispatch => {
  try {
    const response = await axios.post('/api/users/login', user)
    const { token } = response.data
    localStorage.setItem('jwtToken', token)
    setToken(token)

    const decoded = jwt_decode(token)
    setState(dispatch, decoded)

    history.push('/firms')

    setErrors(dispatch, {})
    closeModal()
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setToken(false)

  dispatch(setUser({}))
}

export const putPreferences = body => async dispatch => {
  try {
    const { data } = await axios.put('/api/users/preferences', body)
    setState(dispatch, data)
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

export const postList = body => async dispatch => {
  try {
    const { data } = await axios.post('/api/users/list', body)
    setState(dispatch, data)
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}

export const putLists = body => async dispatch => {
  try {
    const { data } = await axios.put('/api/users/lists', body)
    setState(dispatch, data)
  } catch ({ response }) {
    setErrors(dispatch, response.data)
  }
}
