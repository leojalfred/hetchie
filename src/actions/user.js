import axios from 'axios'
import { SET_USER, CLEAR_USER, CLEAR_DATA } from './types'
import { setError } from './shared'
import setToken from '../utils/authorization'

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

const updateUser = (data, token, dispatch) => {
  sessionStorage.setItem('jwtToken', token)
  setToken(token)
  dispatch(setUser(data))
}

export const putUser = (
  user,
  closeModal,
  register = false
) => async dispatch => {
  try {
    if (register) await axios.post('/api/users/register', user)
    else {
      const response = await axios.put('/api/users', user)
      const { data, token } = response.data

      updateUser(data, token, dispatch)
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
    const { data, token } = response.data

    updateUser(data, token, dispatch)
    setError(dispatch, '')

    history.push('/firms')
    closeModal()
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const logout = () => dispatch => {
  sessionStorage.removeItem('jwtToken')
  setToken()

  dispatch({ type: CLEAR_USER })
  dispatch({ type: CLEAR_DATA })
}

export const put = (url, body) => async dispatch => {
  try {
    const response = await axios.put(url, body)
    const { data, token } = response.data

    updateUser(data, token, dispatch)
    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const putList = (body, setPutListOption) => async dispatch => {
  try {
    const response = await axios.put('/api/users/list', body)
    const { data, putListOption, token } = response.data

    updateUser(data, token, dispatch)
    setPutListOption(putListOption)
    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}

export const deleteAction = (url, body) => async dispatch => {
  try {
    const response = await axios.delete(url, { data: body })
    const { data, token } = response.data

    updateUser(data, token, dispatch)
    setError(dispatch, '')
  } catch ({ response }) {
    setError(dispatch, response.data)
  }
}
