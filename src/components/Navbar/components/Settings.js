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
import { logout } from 'actions/user'
import { useClose } from 'utils/hooks'
import Dropdown from 'components/Dropdown'
import './Settings.scss'

function Settings({ user, openSettingsModal, openPreferencesModal, logout }) {
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
        <Dropdown innerRef={dropdownRef}>
          <button
            className="settings__link"
            onClick={onLinkClick(openSettingsModal)}
          >
            <FontAwesomeIcon className="settings__icon" icon={faUserCog} />
            Account settings
          </button>
          <button
            className="settings__link"
            onClick={onLinkClick(openPreferencesModal)}
          >
            <FontAwesomeIcon className="settings__icon" icon={faBriefcase} />
            Firm preferences
          </button>
          <button className="settings__link" onClick={logout}>
            <FontAwesomeIcon className="settings__icon" icon={faSignOutAlt} />
            Log out
          </button>
        </Dropdown>
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

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { logout })(Settings)
