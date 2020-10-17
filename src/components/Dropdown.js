import React from 'react'
import classNames from 'classnames'
import './Dropdown.scss'

export default function Dropdown({ className, innerRef, onClick, children }) {
  const classes = classNames(className, 'dropdown')
  return (
    <div className={classes} ref={innerRef} onClick={onClick}>
      {children}
    </div>
  )
}
