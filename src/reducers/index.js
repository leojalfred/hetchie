import { combineReducers } from 'redux'
import user from './user'
import data from './data'
import error from './error'

export default combineReducers({ user, hetchie: data, error })
