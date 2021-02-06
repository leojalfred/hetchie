import { SET_USER } from '../actions/types'
import empty from '../utils/empty'

const initialState = { loggedIn: false, data: {} }
export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        loggedIn: !empty(payload),
        data: payload,
      }
    default:
      return state
  }
}
