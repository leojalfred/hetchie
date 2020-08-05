import React from 'react'
import classNames from 'classnames'
import './Rank.scss'

export default function Rank({ className, children }) {
  const classes = classNames(className, 'rank')
  return <span className={classes}>{children}</span>
}
