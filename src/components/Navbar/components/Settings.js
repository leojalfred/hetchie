import React, { useRef, useState } from 'react'
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
  const [dropdownActive, setDropdownActive] = useState(false)
  const activeClass = 'settings__button--active'
  useClose(dropdownRef, activeClass, setDropdownActive)

  const onLinkClick = openModal => () => {
    const button = document.querySelector('.settings__button')
    button.classList.remove(activeClass)

    setDropdownActive(false)
    openModal()
  }

  function onClick(event) {
    const button = event.currentTarget
    button.classList.toggle(activeClass)

    if (!button.classList.contains(activeClass)) setDropdownActive(false)
    else setDropdownActive(true)
  }

  return (
    <div className="settings navbar__link">
      <FontAwesomeIcon
        className="settings__button"
        icon={faCog}
        onClick={onClick}
      />

      {dropdownActive && (
        <Dropdown className="settings__dropdown" innerRef={dropdownRef}>
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
      )}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps, { logout })(Settings)
