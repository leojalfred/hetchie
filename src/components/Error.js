import React from 'react'
import classNames from 'classnames'
import './Error.scss'

export default function Error({ className, message }) {
  if (message.length) {
    const classes = classNames('error', className)

    if (typeof message === 'string') return <p className={classes}>{message}</p>
    else if (typeof message === 'object') {
      const items = message.map((item, i) => (
        <p className="error__line" key={i}>
          {item}
        </p>
      ))
      return <div className={classes}>{items}</div>
    }
  }

  return null
}
