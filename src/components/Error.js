import React from 'react'
import './Error.scss'

export default ({ message }) => {
  console.dir(message)
  return <p className="error">{message}</p>
}
