import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import setToken from './utils/authorization'
import { setUser, logout } from './actions/user'
import store from './store'
import Home from './views/home/Home'
import About from './views/about/About'
import PrivateRoute from './components/PrivateRoute'
import Firms from './views/firms/Firms'
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'
import SettingsModal from './components/SettingsModal'
import PreferencesModal from './components/PreferencesModal'
import Navbar from './components/Navbar'
import './App.scss'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setToken(token)

  const decoded = jwt_decode(token)
  store.dispatch(setUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = '/'
  }
}

function App({ user }) {
  const [registerIsOpen, setRegisterIsOpen] = useState(false)
  const openRegisterModal = () => setRegisterIsOpen(true)
  const closeRegisterModal = () => setRegisterIsOpen(false)

  const [loginIsOpen, setLoginIsOpen] = useState(false)
  const openLoginModal = () => setLoginIsOpen(true)
  const closeLoginModal = () => setLoginIsOpen(false)

  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const openSettingsModal = () => setSettingsIsOpen(true)
  const closeSettingsModal = () => setSettingsIsOpen(false)

  const [preferencesIsOpen, setPreferencesIsOpen] = useState(false)
  const openPreferencesModal = () => setPreferencesIsOpen(true)
  const closePreferencesModal = () => setPreferencesIsOpen(false)

  const [modals, setModals] = useState()
  useEffect(() => {
    if (!user.loggedIn)
      setModals(
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
    else
      setModals(
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
  }, [
    user.loggedIn,
    registerIsOpen,
    loginIsOpen,
    settingsIsOpen,
    preferencesIsOpen,
  ])

  return (
    <Router>
      <Navbar
        openLoginModal={openLoginModal}
        openSettingsModal={openSettingsModal}
        openPreferencesModal={openPreferencesModal}
      />

      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Home {...props} openRegisterModal={openRegisterModal} />
          )}
        />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/firms" component={Firms} />
      </Switch>

      {modals}
    </Router>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(App)
