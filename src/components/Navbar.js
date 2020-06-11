import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import Button from './Button';
import './Navbar.scss';

export default function Navbar({ openLoginModal }) {
  return (
    <nav className="navbar container">
      <Link className="navbar__link navbar__link--brand" to="/">
        <img className="navbar__brand-logo" src={logo} alt="Logo" />
        <p className="navbar__brand-text">hetchie</p>
      </Link>
      <NavLink
        className="navbar__link navbar__link--about"
        activeClassName="navbar__link--active"
        to="/about"
      >
        About
      </NavLink>
      <Button
        className="navbar__link navbar__link--login"
        onClick={openLoginModal}
      >
        Login
      </Button>
    </nav>
  );
}
