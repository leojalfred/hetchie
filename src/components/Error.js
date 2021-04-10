import React from 'react'
import classNames from 'classnames'
import './Error.scss'

export default function Error({ className, message }) {
  if (message.length) {
    const classes = classNames('error', className)

    if (typeof message === 'string') return <p className={classes}>{message}</p>
    else if (typeof message === 'object') {
      message = message.flat().filter(m => m !== undefined)

      const items = message.map((item, i) => {
        if (typeof item === 'object')
          return Object.values(item).map((sub, j) => (
            <p className="error__line" key={j}>
              {sub}
            </p>
          ))

        return (
          <p className="error__line" key={i}>
            {item}
          </p>
        )
      })

      return <div className={classes}>{items}</div>
    }
  }

  return null
}
