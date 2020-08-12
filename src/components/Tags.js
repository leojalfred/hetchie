import React from 'react'
import isEmpty from 'is-empty'
import classNames from 'classnames'
import './Tags.scss'

export default function Tags({ className, data }) {
  if (!isEmpty(data)) {
    const classes = classNames(className, 'tags__tag')
    const tags = data.map(({ _id, name }) => (
      <span className={classes} key={_id}>
        {name}
      </span>
    ))

    return <div className="tags">{tags}</div>
  }

  return <></>
}
