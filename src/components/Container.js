import classNames from 'classnames'
import React from 'react'
import './Container.scss'

export default function Container({ className, children }) {
  const classes = classNames(className, 'container')
  return <div className={classes}>{children}</div>
}
