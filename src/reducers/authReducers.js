import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'is-empty'

const initialState = { loggedIn: false, user: {} }
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loggedIn: !isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return state
  }
}
