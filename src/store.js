import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
let composed = applyMiddleware(thunk)
if (window.__REDUX_DEVTOOLS_EXTENSION__)
  composed = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )

const store = createStore(rootReducer, initialState, composed)
export default store
