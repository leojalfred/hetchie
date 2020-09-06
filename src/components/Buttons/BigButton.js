import React from 'react'
import Button from './Button'
import './BigButton.scss'

function BigButtonLink({
  className = '',
  link = false,
  to,
  children,
  ...props
}) {
  className = `button--big ${className}`.trim()

  return (
    <Button className={className} link={link} to={to} {...props}>
      {children}
    </Button>
  )
}

export default BigButtonLink
