import React from 'react'
import './Errors.scss'

export default function Errors({ errors }) {
  let message = <p className="errors__error">{errors}</p>
  if (typeof errors !== 'string')
    message = errors.map(error => <p className="errors__error">{error}</p>)

  return <div className="errors">{message}</div>
}
