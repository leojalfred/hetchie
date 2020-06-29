import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCog,
  faBriefcase,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'

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

export default function Settings({ openSettingsModal }) {
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
