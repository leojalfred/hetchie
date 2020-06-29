import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './Navbar.scss'
import Button from './Button'
import Settings from './Settings'
import logo from '../images/logo.png'
import { logoutUser } from '../actions/authActions'

function Navbar({ openLoginModal, auth, logoutUser, className }) {
  const [to, setTo] = useState('/')
  const [component, setComponent] = useState()
  useEffect(() => {
    if (!auth.loggedIn) {
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
      setComponent(<Settings />)
    }
  }, [auth, openLoginModal])

  const classes = classNames('navbar', 'container', className)
  return (
    <nav className={classes}>
      <Link className="navbar__link navbar__link--brand" to={to}>
        <img className="navbar__brand-logo" src={logo} alt="Logo" />
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

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps, { logoutUser })(Navbar)
