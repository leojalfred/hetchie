import React from 'react'
import classNames from 'classnames'
import './Error.scss'

export default ({ className, message }) => {
  if (message.length) {
    const classes = classNames('error', className)
    return <p className={classes}>{message}</p>
  }

  return null
}
