import React from 'react'
import classNames from 'classnames'
import './Container.scss'

export default ({ className, children }) => {
  const classes = classNames(className, 'container')
  return <div className={classes}>{children}</div>
}
