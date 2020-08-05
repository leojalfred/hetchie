import React from 'react'
import classNames from 'classnames'
import './Tags.scss'

export default function Tags({ className, data }) {
  const classes = classNames(className, 'tags__tag')
  const tags = data.map(({ _id, name }) => (
    <span class={classes} key={_id}>
      {name}
    </span>
  ))

  return <div className="tags">{tags}</div>
}
