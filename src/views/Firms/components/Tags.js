import classNames from 'classnames'
import React from 'react'
import empty from '../../../utils/empty'
import './Tags.scss'

export default function Tags({ className, data }) {
  if (!empty(data)) {
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
