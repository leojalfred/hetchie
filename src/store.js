import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
let composed = compose(applyMiddleware(thunk))
if (window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined)
  composed = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )

const store = createStore(rootReducer, initialState, composed)
export default store
