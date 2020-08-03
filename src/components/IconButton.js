import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './IconButton.scss'

export default function IconButton({ className, icon }) {
  const classes = classNames(className, 'icon-button')

  return (
    <button class={classes}>
      <FontAwesomeIcon className="icon-button__icon" icon={icon} />
    </button>
  )
}
