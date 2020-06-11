import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link className="navbar__link navbar__link--about" to="/about">
        About
      </Link>
      <Button
        className="navbar__link navbar__link--login"
        onClick={openLoginModal}
      >
        Login
      </Button>
    </nav>
  );
}
