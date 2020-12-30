import React from 'react'
import classNames from 'classnames'
import './Error.scss'

export default function Error({ className, message }) {
  if (message.length) {
    const classes = classNames('error', className)
    return <p className={classes}>{message}</p>
  }

  return null
}
