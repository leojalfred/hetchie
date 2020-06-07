import React from 'react';
import ButtonLink from './ButtonLink';
import './BigButtonLink.scss';

function BigButtonLink({ className = '', to, children }) {
  className = `button--big ${className}`.trim();
  return (
    <ButtonLink className={className} to={to}>
      {children}
    </ButtonLink>
  );
}

export default BigButtonLink;
