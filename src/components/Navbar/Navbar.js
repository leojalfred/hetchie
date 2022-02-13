import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../components/buttons/Button'
import Container from '../../components/Container'
import empty from '../../utils/empty'
import Settings from './components/Settings'
import './Navbar.scss'

function Navbar({
  user,
  openLoginModal,
  // openSettingsModal,
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
          // openSettingsModal={openSettingsModal}
          openPreferencesModal={openPreferencesModal}
        />
      )
    }
  }, [
    user.loggedIn,
    openLoginModal,
    /* openSettingsModal, */ openPreferencesModal,
  ])

  const classes = classNames('navbar', className)
  return (
    <nav className={classes}>
      <Container className="navbar__container">
        <Link className="navbar__link navbar__link--brand" to={to}>
          <img
            className="navbar__brand-logo"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
          />
          <p className="navbar__brand-text">hetchie</p>
        </Link>
        <div className="navbar__links">
          <NavLink
            className="navbar__link"
            activeClassName="navbar__link--active"
            to="/about"
          >
            About
          </NavLink>
          {/* {!empty(user) && user.data.role === 'admin' && (
            <NavLink
              className="navbar__link"
              activeClassName="navbar__link--active"
              to="/admin"
            >
              Admin
            </NavLink>
          )} */}
          {!empty(user) &&
            (user.data.role === 'admin' || user.data.role === 'school') && (
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/school"
              >
                School
              </NavLink>
            )}
          {component}
        </div>
      </Container>
    </nav>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(Navbar)
