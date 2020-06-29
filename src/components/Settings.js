import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCog,
  faBriefcase,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'

export default function Settings() {
  const [dropdown, setDropdown] = useState()
  function onClick() {
    if (dropdown === undefined)
      setDropdown(
        <div className="settings__dropdown">
          <button className="settings__link">
            <FontAwesomeIcon className="settings__icon" icon={faUserCog} />
            Account settings
          </button>
          <button className="settings__link">
            <FontAwesomeIcon className="settings__icon" icon={faBriefcase} />
            Firm preferences
          </button>
        </div>
      )
    else setDropdown(undefined)
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
