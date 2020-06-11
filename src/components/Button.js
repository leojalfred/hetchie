import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

export default function ButtonLink({
  className = '',
  link = false,
  to,
  children,
  ...props
}) {
  className = `button ${className}`.trim();

  let component;
  if (link) {
    component = (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    );
  } else {
    component = (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }
  return component;
}
