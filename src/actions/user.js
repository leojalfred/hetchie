import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { SET_ERROR, SET_USER } from './types'
import setToken from '../utils/authorization'

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

const setError = (dispatch, payload) => dispatch({ type: SET_ERROR, payload })
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

    setError(dispatch, '')
    closeModal()
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const login = (user, history, closeModal) => async dispatch => {
  try {
    const response = await axios.post('/api/users/login', user)
    const { token } = response.data
    sessionStorage.setItem('jwtToken', token)
    setToken(token)

    const decoded = jwt_decode(token)
    dispatch(setUser(decoded))

    history.push('/firms')

    setError(dispatch, '')
    closeModal()
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const logout = () => dispatch => {
  sessionStorage.removeItem('jwtToken')
  setToken(false)

  dispatch(setUser({}))
}

function setState(dispatch, data) {
  dispatch(setUser(data))
  setError(dispatch, '')
}

export const put = (url, body) => async dispatch => {
  try {
    const { data } = await axios.put(url, body)
    setState(dispatch, data)
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const putList = (body, setPutListOption) => async dispatch => {
  try {
    const { data } = await axios.put('/api/users/list', body)
    const { putListOption, ...user } = data

    setPutListOption(putListOption)
    setState(dispatch, user)
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const deleteAction = (url, body) => async dispatch => {
  try {
    const { data } = await axios.delete(url, { data: body })
    setState(dispatch, data)
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}
