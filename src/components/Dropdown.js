import React from 'react'
import classNames from 'classnames'
import './Dropdown.scss'

export default function Dropdown({ className, innerRef, children }) {
  const classes = classNames(className, 'dropdown')
  return (
    <div className={classes} ref={innerRef}>
      {children}
    </div>
  )
}
