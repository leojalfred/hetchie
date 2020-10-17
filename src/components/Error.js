import React from 'react'
import './Error.scss'

export default ({ message }) =>
  message.length ? <p className="error">{message}</p> : null
