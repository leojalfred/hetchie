import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import './App.scss';

function App() {
  return (
    <Router>
      <nav>
        <Link className="brand" to="/">
          <img src={logo} alt="Logo" />
          <p>hetchie</p>
        </Link>
        <Link className="about" to="/about">
          About
        </Link>
        <Link className="login" to="/login">
          Login
        </Link>
      </nav>
    </Router>
  );
}

export default App;
