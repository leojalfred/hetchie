import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCog,
  faBriefcase,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import './Settings.scss'
import { logoutUser } from '../actions/authActions'

function useClose(ref, setComponent) {
  useEffect(() => {
    const handleClose = event => {
      const body = document.querySelector('body')
      if (
        !body.classList.contains('body--modal-open') &&
        ref.current &&
        !ref.current.contains(event.target)
      )
        setComponent(undefined)
    }

    document.addEventListener('mousedown', handleClose)
    return () => document.removeEventListener('mousedown', handleClose)
  }, [ref, setComponent])
}

function Settings({ auth, openSettingsModal, logoutUser }) {
  const dropdownRef = useRef(null)
  const [dropdown, setDropdown] = useState()
  useClose(dropdownRef, setDropdown)

  const onLinkClick = openModal => () => {
    setDropdown(undefined)
    openModal()
  }

  function onClick() {
    if (dropdown === undefined) {
      setDropdown(
        <div className="settings__dropdown" ref={dropdownRef}>
          <button
            className="settings__link"
            onClick={onLinkClick(openSettingsModal)}
          >
            <FontAwesomeIcon className="settings__icon" icon={faUserCog} />
            Account settings
          </button>
          <button className="settings__link">
            <FontAwesomeIcon className="settings__icon" icon={faBriefcase} />
            Firm preferences
          </button>
          <button className="settings__link" onClick={logoutUser}>
            <FontAwesomeIcon className="settings__icon" icon={faSignOutAlt} />
            Log out
          </button>
        </div>
      )
    } else setDropdown(undefined)
  }

  const active = dropdown !== undefined
  const classes = classNames('settings__button', {
    'settings__button--active': active,
  })
  return (
    <div className="settings navbar__link">
      <FontAwesomeIcon className={classes} icon={faCog} onClick={onClick} />
      {dropdown}
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps, { logoutUser })(Settings)
