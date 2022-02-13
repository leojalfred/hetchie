import classNames from 'classnames'
import React from 'react'
import './Dropdown.scss'

export default function Dropdown({ className, innerRef, onClick, children }) {
  const classes = classNames(className, 'dropdown')
  return (
    <div className={classes} ref={innerRef} onClick={onClick}>
      {children}
    </div>
  )
}
