import { SET_CURRENT_USER } from '../actions/types'
import empty from '../utils/empty'

const initialState = { loggedIn: false, data: {} }
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loggedIn: !empty(payload),
        data: payload,
      }
    default:
      return state
  }
}
