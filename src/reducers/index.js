import { combineReducers } from 'redux'
import userReducers from './userReducers'
import errorReducers from './errorReducers'

export default combineReducers({
  user: userReducers,
  errors: errorReducers,
})
