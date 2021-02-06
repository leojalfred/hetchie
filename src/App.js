import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import setToken from 'utils/authorization'
import { setUser } from 'actions/user'
import store from 'store'
import { getLocationsAndPractices } from 'actions/data'
import SettingsModal from 'components/modals/SettingsModal'
import PreferencesModal from 'components/modals/PreferencesModal'
import RegisterModal from 'components/modals/RegisterModal'
import LoginModal from 'components/modals/LoginModal'
import Navbar from 'components/navbar/Navbar'
import Home from 'views/Home/Home'
import About from 'views/About/About'
import ConditionalRoute from 'components/ConditionalRoute'
import Firms from 'views/Firms/Firms'
import Admin from 'views/Admin/Admin'
import School from 'views/School/School'
import './App.scss'

if (sessionStorage.getItem('jwtToken')) {
  const token = sessionStorage.getItem('jwtToken')
  setToken(token)

  const decoded = jwt_decode(token)
  store.dispatch(setUser(decoded))
}

function App({ user, getLocationsAndPractices }) {
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

  useEffect(() => {
    if (user.loggedIn) getLocationsAndPractices()
  }, [user.loggedIn, getLocationsAndPractices])

  const [modals, setModals] = useState()
  useEffect(() => {
    let displayedModals = user.loggedIn ? (
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
    ) : (
      <>
        <RegisterModal
          isOpen={registerIsOpen}
          closeRegisterModal={closeRegisterModal}
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <LoginModal
          isOpen={loginIsOpen}
          closeLoginModal={closeLoginModal}
          openRegisterModal={openRegisterModal}
        />
      </>
    )

    setModals(displayedModals)
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
        <ConditionalRoute
          exact
          path="/firms"
          condition={user.loggedIn === true}
          component={Firms}
        />
        <ConditionalRoute
          exact
          path="/school"
          condition={user.data.role === 'school'}
          component={School}
        />
        <ConditionalRoute
          exact
          path="/admin"
          condition={user.data.role === 'admin'}
          component={Admin}
        />
      </Switch>

      {modals}
    </Router>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { getLocationsAndPractices })(App)
