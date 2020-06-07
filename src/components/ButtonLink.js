import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss';

function ButtonLink({ className = '', to, children }) {
  className = `button ${className}`.trim();
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default ButtonLink;
