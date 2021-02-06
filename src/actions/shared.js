import { SET_ERROR } from './types'

export const setError = (dispatch, payload) =>
  dispatch({ type: SET_ERROR, payload })
