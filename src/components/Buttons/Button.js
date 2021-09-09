import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

export default function Button({
  className = '',
  link = false,
  to,
  href,
  children,
  ...props
}) {
  className = `button ${className}`.trim()

  let component
  if (link) {
    component = (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    )
  } else if (href) {
    component = (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    )
  } else {
    component = (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }
  return component
}
