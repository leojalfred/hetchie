import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
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
import PreferencesModal from './components/PreferencesModal'
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

function App({ auth }) {
  const [registerIsOpen, setRegisterIsOpen] = React.useState(false)
  const openRegisterModal = () => setRegisterIsOpen(true)
  const closeRegisterModal = () => setRegisterIsOpen(false)

  const [loginIsOpen, setLoginIsOpen] = React.useState(false)
  const openLoginModal = () => setLoginIsOpen(true)
  const closeLoginModal = () => setLoginIsOpen(false)

  const [settingsIsOpen, setSettingsIsOpen] = React.useState(false)
  const openSettingsModal = () => setSettingsIsOpen(true)
  const closeSettingsModal = () => setSettingsIsOpen(false)

  const [preferencesIsOpen, setPreferencesIsOpen] = React.useState(false)
  const openPreferencesModal = () => setPreferencesIsOpen(true)
  const closePreferencesModal = () => setPreferencesIsOpen(false)

  let modals
  if (!auth.loggedIn) {
    modals = (
      <>
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
      </>
    )
  } else {
    modals = (
      <>
        <SettingsModal
          isOpen={settingsIsOpen}
          closeModal={closeSettingsModal}
        />
        <PreferencesModal
          isOpen={preferencesIsOpen}
          closeModal={closePreferencesModal}
        />
      </>
    )
  }

  return (
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
          render={props => <About {...props} openLoginModal={openLoginModal} />}
        />
        <PrivateRoute
          exact
          path="/firms"
          component={Firms}
          openSettingsModal={openSettingsModal}
          openPreferencesModal={openPreferencesModal}
        />
      </Switch>

      {modals}
    </Router>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(App)
