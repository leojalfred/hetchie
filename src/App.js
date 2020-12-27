import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import setToken from 'utils/authorization'
import { setUser, logout } from 'actions/user'
import store from 'store'
import Home from 'views/Home/Home'
import About from 'views/About/About'
import PrivateRoute from 'components/PrivateRoute'
import Firms from 'views/Firms/Firms'
import RegisterModal from 'components/Modals/RegisterModal'
import LoginModal from 'components/Modals/LoginModal'
import SettingsModal from 'components/Modals/SettingsModal'
import PreferencesModal from 'components/Modals/PreferencesModal'
import Navbar from 'components/Navbar/Navbar'
import './App.scss'

if (sessionStorage.getItem('jwtToken')) {
  const token = sessionStorage.getItem('jwtToken')
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

  const params = new URLSearchParams(window.location.search)
  const verified = params.get('verified') === 'true'
  const [loginIsOpen, setLoginIsOpen] = useState(verified)
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
    const unathorizedModals = (
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
    const authorizedModals = (
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

    if (!user.loggedIn) setModals(unathorizedModals)
    else setModals(authorizedModals)
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
