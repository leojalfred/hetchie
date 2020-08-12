import React from 'react'
import classNames from 'classnames'
import './Badge.scss'

export default function Badge({ className, children }) {
  const classes = classNames(className, 'badge')
  return <span className={classes}>{children}</span>
}
