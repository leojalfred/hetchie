import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import ButtonLink from './ButtonLink';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar container">
      <Link className="navbar__link navbar__link--brand" to="/">
        <img className="navbar__brand-logo" src={logo} alt="Logo" />
        <p className="navbar__brand-text">hetchie</p>
      </Link>
      <Link className="navbar__link navbar__link--about" to="/about">
        About
      </Link>
      <ButtonLink className="navbar__link navbar__link--login" to="/login">
        Login
      </ButtonLink>
    </nav>
  );
}

export default Navbar;
