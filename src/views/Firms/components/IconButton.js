import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './IconButton.scss'

export default function IconButton({ className, onClick, icon }) {
  const classes = classNames(className, 'icon-button')

  return (
    <button className={classes} onClick={onClick}>
      <FontAwesomeIcon className="icon-button__icon" icon={icon} />
    </button>
  )
}
