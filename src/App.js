import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import store from './store'
import Home from './views/home/Home'
import About from './views/about/About'
import PrivateRoute from './components/PrivateRoute'
import Firms from './views/firms/Firms'
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'
import SettingsModal from './components/SettingsModal'
import './App.scss'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)

  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  }
}

export default function App() {
  const [registerIsOpen, setRegisterIsOpen] = React.useState(false)
  const openRegisterModal = () => setRegisterIsOpen(true)
  const closeRegisterModal = () => setRegisterIsOpen(false)

  const [loginIsOpen, setLoginIsOpen] = React.useState(false)
  const openLoginModal = () => setLoginIsOpen(true)
  const closeLoginModal = () => setLoginIsOpen(false)

  const [settingsIsOpen, setSettingsIsOpen] = React.useState(false)
  const openSettingsModal = () => setSettingsIsOpen(true)
  const closeSettingsModal = () => setSettingsIsOpen(false)

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                openLoginModal={openLoginModal}
                openRegisterModal={openRegisterModal}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={props => (
              <About {...props} openLoginModal={openLoginModal} />
            )}
          />
          <PrivateRoute
            exact
            path="/firms"
            component={Firms}
            openSettingsModal={openSettingsModal}
          />
        </Switch>

        <RegisterModal
          isOpen={registerIsOpen}
          closeRegisterModal={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
        <LoginModal
          isOpen={loginIsOpen}
          closeLoginModal={closeLoginModal}
          openRegisterModal={openRegisterModal}
        />

        <SettingsModal
          isOpen={settingsIsOpen}
          closeModal={closeSettingsModal}
        />
      </Router>
    </Provider>
  )
}
