import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import path from 'path'
import { connect } from 'react-redux'
import Button from 'components/Buttons/Button'
import Settings from './components/Settings'
import './Navbar.scss'

function Navbar({
  user,
  openLoginModal,
  openSettingsModal,
  openPreferencesModal,
  className,
}) {
  const [to, setTo] = useState('/')
  const [component, setComponent] = useState()
  useEffect(() => {
    if (!user.loggedIn) {
      setTo('/')
      setComponent(
        <Button
          className="navbar__link navbar__link--login"
          onClick={openLoginModal}
        >
          Login
        </Button>
      )
    } else {
      setTo('/firms')
      setComponent(
        <Settings
          openSettingsModal={openSettingsModal}
          openPreferencesModal={openPreferencesModal}
        />
      )
    }
  }, [user.loggedIn, openLoginModal, openSettingsModal, openPreferencesModal])

  const classes = classNames('navbar', 'container', className)
  return (
    <nav className={classes}>
      <Link className="navbar__link navbar__link--brand" to={to}>
        <img
          className="navbar__brand-logo"
          src={path.join(process.env.PUBLIC_URL, '/logo.png')}
          alt="Logo"
        />
        <p className="navbar__brand-text">hetchie</p>
      </Link>
      <NavLink
        className="navbar__link navbar__link--about"
        activeClassName="navbar__link--active"
        to="/about"
      >
        About
      </NavLink>
      {component}
    </nav>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(Navbar)
