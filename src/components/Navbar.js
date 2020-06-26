import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../images/logo.png'
import Button from './Button'
import './Navbar.scss'
import { logoutUser } from '../actions/authActions'

function Navbar({ auth, logoutUser, openLoginModal }) {
  const [onClick, setOnClick] = useState(() => openLoginModal)
  const [text, setText] = useState('Login')
  useEffect(() => {
    if (!auth.loggedIn && text === 'Logout') {
      setOnClick(() => openLoginModal)
      setText('Login')
    } else if (auth.loggedIn && text === 'Login') {
      setOnClick(() => logoutUser)
      setText('Logout')
    }
  }, [auth, text, openLoginModal, logoutUser])

  return (
    <nav className="navbar container">
      <Link className="navbar__link navbar__link--brand" to="/">
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
      <Button className="navbar__link navbar__link--login" onClick={onClick}>
        {text}
      </Button>
    </nav>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps, { logoutUser })(Navbar)
