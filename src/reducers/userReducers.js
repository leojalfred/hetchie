import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'is-empty'

const initialState = { loggedIn: false, data: {} }
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loggedIn: !isEmpty(payload),
        data: payload,
      }
    default:
      return state
  }
}
