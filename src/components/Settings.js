import React, { useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'

export default function Settings() {
  const [dropdown, setDropdown] = useState()
  const onClick = () => {
    if (dropdown === null) setDropdown(<div>Cock</div>)
    else setDropdown(null)
  }

  const active = dropdown !== null
  const classes = classNames('settings navbar__link', {
    'settings--active': active,
  })
  return (
    <>
      <FontAwesomeIcon className={classes} icon={faCog} onClick={onClick} />
      {dropdown}
    </>
  )
}
