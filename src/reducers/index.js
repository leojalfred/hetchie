import { combineReducers } from 'redux'
import data from './data'
import error from './error'
import user from './user'

export default combineReducers({ user, hetchie: data, error })
